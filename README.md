# Forma Studio — Mimarlık & İç Tasarım

Üst segment bir **mimarlık & iç tasarım ofisi** için galeri/dergi estetiğinde,
yüksek görsellikli statik demo site. Astro + Tailwind + GSAP ile kuruldu.

**Canlı demo:** [mimarlik.demo.dijifa.com](https://mimarlik.demo.dijifa.com)

---

## Öne çıkanlar

- **Tam ekran hero** — büyük tipografi reveal + custom cursor
- **Smooth scroll** (Lenis) + GSAP ScrollTrigger entegrasyonu
- **Image reveal** (clip-path mask) ve hafif zoom
- **Custom cursor** (dot + ring, hover'da büyüme & etiket)
- **Magnetic butonlar**
- **Manifesto** — scroll'da kelime kelime reveal
- **Yatay scroll süreç bölümü** (pin + scrub)
- **Filtrelenebilir portföy** (konut / ticari / iç mekan)
- **Proje detay sayfaları** — büyük galeri + proje künyesi (alan, yıl, konum, kategori)
- **Sayfa geçiş animasyonları** (Astro ClientRouter + wipe overlay)
- **SEO** — JSON-LD `ProfessionalService`, Open Graph, sitemap
- **Erişilebilirlik** — `prefers-reduced-motion` desteği, anlamlı etiketler

## Teknoloji

| Katman | Araç |
| --- | --- |
| Framework | [Astro](https://astro.build) (static output) |
| Stil | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`) + tasarım token'ları |
| Animasyon | [GSAP](https://gsap.com) + ScrollTrigger |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) |
| Tipografi | Archivo (display/başlık) + Inter (gövde) |
| Sunum | Nginx (Docker, çok aşamalı build) |

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:4321
```

## Derleme

```bash
npm run build    # statik çıktı → dist/
npm run preview  # dist/ önizleme
```

## Docker

Çok aşamalı `Dockerfile` (Node ile build → Nginx ile sun):

```bash
docker build -t forma-studio .
docker run -p 8080:80 forma-studio   # http://localhost:8080
```

`nginx.conf`; gzip, statik varlık cache'i, güvenlik başlıkları ve Astro
directory-build için `try_files` yönlendirmesi içerir.

## Proje yapısı

```
src/
├── components/   Nav, Footer, Button, ProjectCard
├── data/         projects.js  (portföy verisi)
├── layouts/      Base.astro   (head, SEO, JSON-LD, ClientRouter)
├── pages/        index, projeler/[slug], hizmetler, studyo, surec, iletisim, 404
├── scripts/      site.js      (GSAP/Lenis/cursor/filter/form yaşam döngüsü)
└── styles/       global.css   (tasarım token'ları + Tailwind)
public/images/    portföy görselleri
```

## Deploy (Coolify)

Repo bir Dockerfile içerdiği için Coolify'da **Dockerfile** kaynak tipiyle
deploy edilir. Domain `mimarlik.demo.dijifa.com` olarak ayarlanır, port `80`.

---

> Bu bir tasarım demosudur. İletişim formu sunucuya gönderim yapmaz;
> görseller Unsplash'tan derlenmiştir.
