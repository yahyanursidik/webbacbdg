from __future__ import annotations

import argparse
import hashlib
import json
import re
import time
import unicodedata
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageFile, ImageOps


ImageFile.LOAD_TRUNCATED_IMAGES = True

CATEGORIES = {
    "Atr-bpn": ("ATR/BPN", "atr-bpn", "Atribut pertanahan, pangkat, pin, dan kelengkapan ATR/BPN.", "var(--service-blue)", "var(--service-gold)"),
    "Barantin": ("Barantin", "barantin", "Atribut Badan Karantina untuk seragam dan kebutuhan kedinasan.", "var(--service-green)", "var(--service-gold)"),
    "BPBD": ("BPBD", "bpbd", "Atribut BPBD untuk seragam, lapangan, dan kegiatan resmi.", "var(--service-orange)", "var(--service-blue)"),
    "Camat": ("Camat", "camat", "Pangkat, tanda jabatan, pin, dan atribut kecamatan.", "var(--service-purple)", "var(--service-gold)"),
    "Dishub": ("Dishub", "dishub", "Atribut Dinas Perhubungan untuk seragam dan operasional.", "var(--service-blue)", "var(--service-orange)"),
    "Imipas": ("Imipas", "imipas", "Atribut imigrasi dan pemasyarakatan berdasarkan katalog BAC.", "var(--service-blue)", "var(--service-gold)"),
    "Jaksa": ("Jaksa", "jaksa", "Pin, pangkat, tanda jabatan, dan atribut profesi jaksa.", "var(--service-maroon)", "var(--service-gold)"),
    "Kejaksaan": ("Kejaksaan", "kejaksaan", "Atribut Kejaksaan untuk seragam dan kebutuhan resmi.", "var(--service-maroon)", "var(--service-gold)"),
    "Kemenhub": ("Kemenhub", "kemenhub", "Atribut Kementerian Perhubungan dan unit terkait.", "var(--service-blue)", "var(--service-orange)"),
    "Lurah": ("Lurah", "lurah", "Pangkat, tanda jabatan, pin, dan atribut kelurahan.", "var(--service-purple)", "var(--service-gold)"),
    "Pemadam": ("Pemadam", "pemadam", "Atribut pemadam kebakaran untuk seragam dan lapangan.", "var(--service-maroon)", "var(--service-orange)"),
    "Pol pp": ("Pol PP", "pol-pp", "Atribut Polisi Pamong Praja untuk seragam dan kegiatan resmi.", "var(--service-green)", "var(--service-gold)"),
    "Polhut": ("Polhut", "polhut", "Atribut Polisi Hutan untuk seragam dan kebutuhan lapangan.", "var(--service-green)", "var(--service-leaf)"),
    "Polisi": ("Polisi", "polisi", "Atribut kepolisian berdasarkan koleksi katalog BAC.", "var(--color-ink)", "var(--service-gold)"),
    "Polsuska": ("Polsuska", "polsuska", "Atribut Polisi Khusus Kereta Api dan perlengkapannya.", "var(--service-blue)", "var(--service-gold)"),
    "Sabuk logo daerah": ("Sabuk Logo Daerah", "sabuk-logo-daerah", "Sabuk dengan pilihan logo pemerintah daerah.", "var(--service-charcoal)", "var(--service-gold)"),
    "Satpam": ("Satpam", "satpam", "Atribut satuan pengamanan untuk seragam dan operasional.", "var(--service-blue)", "var(--service-gold)"),
}

TYPE_RULES = [
    ("tanda jabatan", "Tanda Jabatan"),
    ("kepala kopel", "Kepala Kopel"),
    ("papan nama", "Papan Nama"),
    ("pangkat", "Pangkat"),
    ("sabuk", "Sabuk"),
    ("emblem", "Emblem"),
    ("badge", "Badge"),
    ("lencana", "Lencana"),
    ("monogram", "Monogram"),
    ("wing", "Wing"),
    ("pin", "Pin"),
    ("topi", "Topi"),
    ("kopel", "Kopel"),
    ("logo", "Logo"),
    ("box", "Paket / Box"),
    ("dasi", "Dasi"),
    ("kaos", "Pakaian"),
    ("kemeja", "Pakaian"),
    ("atribut", "Atribut"),
    ("atr ", "Atribut"),
]

TOKEN_CASE = {
    "atr": "ATR",
    "bpn": "BPN",
    "bpbd": "BPBD",
    "pdh": "PDH",
    "pdu": "PDU",
    "pp": "PP",
    "lb": "LB",
    "lm": "LM",
    "pom": "POM",
    "polri": "Polri",
    "dishub": "Dishub",
    "imipas": "Imipas",
    "k+a": "K+A",
    "asn": "ASN",
    "pns": "PNS",
    "korpri": "Korpri",
}

COLOR_WORDS = {
    "abu": "Abu-abu",
    "biru": "Biru",
    "coklat": "Cokelat",
    "emas": "Emas",
    "gold": "Emas",
    "hijau": "Hijau",
    "hitam": "Hitam",
    "khaki": "Khaki",
    "kheki": "Khaki",
    "kuning": "Kuning",
    "marun": "Marun",
    "merah": "Merah",
    "navy": "Navy",
    "nevy": "Navy",
    "orange": "Oranye",
    "oranye": "Oranye",
    "perak": "Perak",
    "putih": "Putih",
    "silver": "Perak",
}


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value or "produk"


def source_label(path: str) -> str:
    name = Path(path).name
    name = re.sub(r"\.(jpe?g|png|webp|heic)$", "", name, flags=re.IGNORECASE)
    return re.sub(r"\s+", " ", name.replace("_", " ").strip())


def display_name(label: str) -> str:
    words = re.split(r"\s+", label)
    rendered = []
    for word in words:
        lower = word.lower().strip(".,")
        if re.fullmatch(r"\d+[a-z]", lower):
            rendered.append(lower.upper())
        else:
            rendered.append(TOKEN_CASE.get(lower, word.capitalize()))
    return (
        " ".join(rendered)
        .replace("Kheki", "Khaki")
        .replace("Nevy", "Navy")
        .replace("Eslon", "Eselon")
        .replace("Crome", "Chrome")
    )


def attribute_type(label: str) -> str:
    lower = f"{label.lower()} "
    return next((name for keyword, name in TYPE_RULES if keyword in lower), "Atribut")


def is_generic_label(label: str) -> bool:
    return bool(re.match(r"^(img|wa|image|photo|screenshot|dsc|pxl)[-_ ]", label, flags=re.IGNORECASE))


def colors_for(label: str) -> str:
    lower = label.lower()
    colors = []
    for keyword, name in COLOR_WORDS.items():
        if re.search(rf"\b{re.escape(keyword)}\b", lower) and name not in colors:
            colors.append(name)
    return ", ".join(colors) if colors else "Sesuai foto dan referensi"


def file_id(url: str) -> str:
    match = re.search(r"[?&]id=([^&]+)", url)
    return match.group(1) if match else hashlib.sha1(url.encode()).hexdigest()[:16]


def download_bytes(url: str, attempts: int = 4) -> bytes:
    download_url = f"{url}&export=download&confirm=t"
    last_error: Exception | None = None
    for attempt in range(attempts):
        try:
            request = Request(download_url, headers={"User-Agent": "Mozilla/5.0 BAC catalog importer"})
            with urlopen(request, timeout=120) as response:
                data = response.read()
                content_type = response.headers.get("Content-Type", "")
            if len(data) < 1024 or "text/html" in content_type:
                raise ValueError(f"Unexpected response: {content_type}, {len(data)} bytes")
            return data
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Download failed after {attempts} attempts: {last_error}")


def convert_entry(task: dict) -> dict:
    output = Path(task["output"])
    if output.exists() and output.stat().st_size > 1024:
        return {**task, "status": "cached", "bytes": output.stat().st_size}

    data = download_bytes(task["url"])
    with Image.open(BytesIO(data)) as source:
        image = ImageOps.exif_transpose(source)
        image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        output.parent.mkdir(parents=True, exist_ok=True)
        image.save(output, "WEBP", quality=70, method=6, optimize=True)

    return {**task, "status": "downloaded", "bytes": output.stat().st_size}


def build_products(manifest: list[dict], public_dir: Path, workers: int) -> tuple[list[dict], list[dict], list[dict]]:
    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for entry in manifest:
        root = entry["path"].replace("\\", "/").split("/", 1)[0]
        if root not in CATEGORIES:
            continue
        label = source_label(entry["path"])
        grouped[(root, label.casefold())].append({**entry, "label": label})

    used_slugs: set[str] = set()
    generic_counts: dict[str, int] = defaultdict(int)
    products: list[dict] = []
    tasks: list[dict] = []

    for (root, _), entries in sorted(grouped.items(), key=lambda item: (item[0][0], item[1][0]["label"].casefold())):
        category_name, category_slug, *_ = CATEGORIES[root]
        label = entries[0]["label"]
        base_slug = f"{category_slug}-{slugify(label)}"
        slug = base_slug
        suffix = 2
        while slug in used_slugs:
            slug = f"{base_slug}-{suffix}"
            suffix += 1
        used_slugs.add(slug)

        image_paths = []
        for index, entry in enumerate(entries, start=1):
            image_name = f"{slug}-{index:02d}.webp"
            output = public_dir / category_slug / image_name
            public_path = f"/catalog/{category_slug}/{image_name}"
            image_paths.append(public_path)
            tasks.append({
                "url": entry["url"],
                "sourcePath": entry["path"],
                "fileId": file_id(entry["url"]),
                "output": str(output),
                "publicPath": public_path,
            })

        kind = attribute_type(label)
        if is_generic_label(label):
            generic_counts[root] += 1
            name = f"Koleksi Atribut {category_name} {generic_counts[root]:02d}"
        else:
            name = display_name(label)
        products.append({
            "name": name,
            "slug": slug,
            "category": category_slug,
            "institution": category_name,
            "attributeType": kind,
            "shortDescription": f"{kind} {category_name} berdasarkan foto katalog BAC.",
            "fullDescription": (
                f"Referensi {name} untuk kebutuhan {category_name}. "
                "Ketersediaan, bahan, ukuran, warna, dan finishing dikonfirmasi dengan admin BAC sebelum pemesanan."
            ),
            "material": "Konfirmasi bahan dan finishing dengan admin BAC",
            "size": "Menyesuaikan referensi dan kebutuhan",
            "color": colors_for(label),
            "variant": f"{len(entries)} foto katalog" if len(entries) > 1 else "Sesuai foto katalog",
            "status": "Konfirmasi Admin",
            "minOrder": "Konfirmasi jumlah dengan admin BAC",
            "image": image_paths[0],
            "images": image_paths,
            "sourceName": label,
        })

    results = []
    failures = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(convert_entry, task): task for task in tasks}
        total = len(futures)
        for completed, future in enumerate(as_completed(futures), start=1):
            try:
                results.append(future.result())
            except Exception as exc:  # noqa: BLE001
                failures.append({**futures[future], "error": str(exc)})
            if completed % 25 == 0 or completed == total:
                print(f"Processed {completed}/{total}; failures={len(failures)}", flush=True)

    failed_paths = {item["publicPath"] for item in failures}
    ready_products = []
    for product in products:
        images = [image for image in product["images"] if image not in failed_paths]
        if not images:
            continue
        product["images"] = images
        product["image"] = images[0]
        ready_products.append(product)

    for product in ready_products[:6]:
        product["featured"] = True

    return ready_products, results, failures


def main() -> None:
    parser = argparse.ArgumentParser(description="Import the public BAC Google Drive catalogue.")
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--public-dir", type=Path, required=True)
    parser.add_argument("--data-file", type=Path, required=True)
    parser.add_argument("--report-file", type=Path, required=True)
    parser.add_argument("--workers", type=int, default=16)
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text(encoding="utf-8-sig"))
    products, results, failures = build_products(manifest, args.public_dir, args.workers)
    categories = [
        {
            "name": values[0],
            "slug": values[1],
            "description": values[2],
            "color": values[3],
            "accent": values[4],
        }
        for values in CATEGORIES.values()
    ]
    attribute_types = sorted({product["attributeType"] for product in products})
    payload = {"categories": categories, "attributeTypes": attribute_types, "products": products}
    args.data_file.parent.mkdir(parents=True, exist_ok=True)
    args.data_file.write_text(json.dumps(payload, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")

    report = {
        "sourceItems": len(manifest),
        "products": len(products),
        "images": len(results),
        "downloaded": sum(item["status"] == "downloaded" for item in results),
        "cached": sum(item["status"] == "cached" for item in results),
        "failed": failures,
        "outputBytes": sum(item["bytes"] for item in results),
    }
    args.report_file.write_text(json.dumps(report, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key != "failed"}, indent=2))


if __name__ == "__main__":
    main()
