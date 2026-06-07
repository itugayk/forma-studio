// ============================================================
// Forma Studio — Portföy verisi
// Kategoriler: konut · ticari · ic-mekan
// ============================================================

export const categories = [
  { key: 'tum', label: 'Tümü' },
  { key: 'konut', label: 'Konut' },
  { key: 'ticari', label: 'Ticari' },
  { key: 'ic-mekan', label: 'İç Mekan' },
];

export const categoryLabel = {
  konut: 'Konut',
  ticari: 'Ticari',
  'ic-mekan': 'İç Mekan',
};

export const projects = [
  {
    slug: 'meridyen-evi',
    no: '01',
    title: 'Meridyen Evi',
    category: 'konut',
    year: '2024',
    location: 'Bodrum, Muğla',
    area: '420 m²',
    client: 'Özel',
    cover: '/images/p-01.jpg',
    summary:
      'Ege yamacına oturan, denizle yatay çizgide diyaloğa giren tek katlı bir konut.',
    description: [
      'Meridyen Evi, arazinin doğal eğimini bozmadan zemine yayılan yatay bir kütle olarak kurgulandı. Yaşam mekânları güneye, manzaraya doğru tamamen açılırken; servis hacimleri kuzeydeki taş duvar arkasına gizlendi.',
      'Kireç sıva, doğal taş ve dumanlı meşe; malzeme paleti yörenin dokusundan damıtıldı. Geniş açıklıklı sürme cepheler iç ile dış arasındaki sınırı eritir, gölge ve ışık günün ritmini mekâna taşır.',
    ],
    services: ['Mimari Tasarım', 'İç Mimari', 'Peyzaj Konsepti'],
    gallery: ['/images/p-02.jpg', '/images/p-19.jpg', '/images/p-03.jpg'],
    featured: true,
  },
  {
    slug: 'karbon-ofis',
    no: '02',
    title: 'Karbon Ofis',
    category: 'ticari',
    year: '2024',
    location: 'Levent, İstanbul',
    area: '1.200 m²',
    client: 'Karbon Teknoloji',
    cover: '/images/p-14.jpg',
    summary:
      'Bir yazılım şirketi için hiyerarşiyi yatay kuran, ışıkla çalışan açık ofis.',
    description: [
      'Karbon Ofis, kapalı oda mantığını terk eden; ekiplerin akışına göre genişleyip daralan bir iç peyzaj olarak tasarlandı. Merkezdeki amfi hem buluşma hem sunum hem de mola alanı olarak çalışıyor.',
      'Ham beton, siyah çelik ve sıcak akustik panellerin karşıtlığı, teknik bir markanın karakterini mekâna çevirir. Aydınlatma, çalışma masasından toplantıya kadar her senaryoda gözü yormayacak biçimde katmanlandı.',
    ],
    services: ['İç Mimari', 'Aydınlatma Tasarımı', 'Mobilya Tasarımı'],
    gallery: ['/images/p-15.jpg', '/images/p-13.jpg', '/images/p-11.jpg'],
    featured: true,
  },
  {
    slug: 'beyaz-kup',
    no: '03',
    title: 'Beyaz Küp',
    category: 'konut',
    year: '2024',
    location: 'Çeşme, İzmir',
    area: '280 m²',
    client: 'Özel',
    cover: '/images/p-10.jpg',
    summary:
      'Sade bir geometrinin içine oyulmuş gölgeli avlular ve gizli bir ışıklık.',
    description: [
      'Beyaz Küp, dışarıya kapalı ama içeride patlayan bir ev. Sokak cephesi sessiz ve masif; içeride ise avlu, ışıklık ve teras dizisi mekânı sürekli gökyüzüne bağlıyor.',
      'Tek malzemenin —kireç beyazı sıvanın— farklı dokularda tekrarı, evi tek bir heykele dönüştürür. Terracotta detaylar yalnızca eşiklerde, gözün dinlendiği noktalarda belirir.',
    ],
    services: ['Mimari Tasarım', 'İç Mimari'],
    gallery: ['/images/p-17.jpg', '/images/p-06.jpg', '/images/p-04.jpg'],
    featured: true,
  },
  {
    slug: 'atolye-loft',
    no: '04',
    title: 'Atölye Loft',
    category: 'ic-mekan',
    year: '2023',
    location: 'Karaköy, İstanbul',
    area: '180 m²',
    client: 'Özel',
    cover: '/images/p-07.jpg',
    summary:
      'Eski bir han katının, izlerini koruyarak bir yaşam-atölyesine dönüşümü.',
    description: [
      'Tarihi bir han katının özgün tuğla duvarları ve döküm kolonları soyularak açığa çıkarıldı. Yeni eklenen her şey —çelik mezzanine, cam bölme, meşe podyum— eskiye saygıyla, hafif ve geri çekilmiş bir dille yerleştirildi.',
      'Mekân gün içinde atölye, akşam ev olarak çalışıyor. Mobilyalar tekerlekli ve modüler; kullanıcının senaryosuna göre planı yeniden yazmasına izin veriyor.',
    ],
    services: ['İç Mimari', 'Restorasyon Danışmanlığı', 'Mobilya Tasarımı'],
    gallery: ['/images/p-18.jpg', '/images/p-16.jpg', '/images/p-05.jpg'],
    featured: true,
  },
  {
    slug: 'galeri-9',
    no: '05',
    title: 'Galeri 9',
    category: 'ticari',
    year: '2022',
    location: 'Çankaya, Ankara',
    area: '540 m²',
    client: 'Dokuz Sanat',
    cover: '/images/p-09.jpg',
    summary:
      'Çağdaş sanat için nötr ama karaktersiz olmayan bir sergi kabuğu.',
    description: [
      'Galeri 9, eserin önüne geçmeyen ama mekânın da silinmediği bir denge arar. Hareketli sergi duvarları her açılışta yeni bir parkur kurulmasına imkân verir.',
      'Tavandaki yıkamalı aydınlatma hattı ve mikrobeton zemin, ışığı eşit ve gölgesiz dağıtır. Giriş holündeki tek terracotta hacim, bütün ziyareti karşılayan işaret öğesidir.',
    ],
    services: ['Mimari Tasarım', 'İç Mimari', 'Aydınlatma Tasarımı'],
    gallery: ['/images/p-12.jpg', '/images/p-08.jpg', '/images/p-11.jpg'],
    featured: false,
  },
  {
    slug: 'sahil-rezidans',
    no: '06',
    title: 'Sahil Rezidans',
    category: 'konut',
    year: '2023',
    location: 'Urla, İzmir',
    area: '310 m²',
    client: 'Özel',
    cover: '/images/p-19.jpg',
    summary:
      'Rüzgârın yönüne göre kurgulanmış, iki avlu arasında nefes alan yazlık.',
    description: [
      'Sahil Rezidans, hâkim imbat rüzgârını yapının içinden geçirecek biçimde iki avlu arasına yerleştirildi. Doğal havalandırma, sıcak aylarda mekanik soğutmaya neredeyse hiç ihtiyaç bırakmıyor.',
      'Pürüzlü taş duvarlar ile cilalı mikrobeton zeminin karşıtlığı, çıplak ayağın hissedeceği bir doku haritası kurar. Pergola gölgeleri gün boyu cephede yürür.',
    ],
    services: ['Mimari Tasarım', 'Peyzaj Konsepti', 'İç Mimari'],
    gallery: ['/images/p-01.jpg', '/images/p-17.jpg', '/images/p-02.jpg'],
    featured: false,
  },
  {
    slug: 'toprak-kafe',
    no: '07',
    title: 'Toprak Kafe',
    category: 'ic-mekan',
    year: '2023',
    location: 'Cihangir, İstanbul',
    area: '220 m²',
    client: 'Toprak F&B',
    cover: '/images/p-20.jpg',
    summary:
      'Tek bir toprak tonundan kurulan, sıcak ve elle yapılmış bir kafe iç mekânı.',
    description: [
      'Toprak Kafe, ismini malzemesinden alıyor: sıvanmış kil duvarlar, terracotta zemin ve pişmiş toprak detaylar mekânı tek bir paletin tonlarına indiriyor.',
      'El yapımı seramik tezgâh, döküm pirinç armatürler ve ahşap oturma adaları; endüstriyel ölçeği insan ölçeğine çekiyor. Akustik, dolu bir günde bile konuşmayı mümkün kılacak şekilde çözüldü.',
    ],
    services: ['İç Mimari', 'Mobilya Tasarımı', 'Marka Mekânı'],
    gallery: ['/images/p-03.jpg', '/images/p-16.jpg', '/images/p-04.jpg'],
    featured: false,
  },
  {
    slug: 'sarmal-apartman',
    no: '08',
    title: 'Sarmal Apartman',
    category: 'konut',
    year: '2022',
    location: 'Nişantaşı, İstanbul',
    area: '950 m²',
    client: 'Sarmal Yapı',
    cover: '/images/p-13.jpg',
    summary:
      'Ortak merdiveni binanın kalbi yapan, on iki daireli butik apartman.',
    description: [
      'Sarmal Apartman, dairelerin etrafında döndüğü tepe ışıklı bir merdiven çekirdeği üzerine kuruldu. Bu boşluk hem dolaşım hem de komşuluğun kurulduğu sosyal bir omurga.',
      'Cephede dikey terracotta lameller hem güneş kırıcı hem de mahremiyet perdesi olarak çalışıyor. İç mekânlarda nötr bir kabuk, sakinlerin kendi karakterini eklemesine alan bırakır.',
    ],
    services: ['Mimari Tasarım', 'İç Mimari', 'Cephe Tasarımı'],
    gallery: ['/images/p-12.jpg', '/images/p-11.jpg', '/images/p-09.jpg'],
    featured: false,
  },
  {
    slug: 'studyo-isik',
    no: '09',
    title: 'Stüdyo Işık',
    category: 'ic-mekan',
    year: '2024',
    location: 'Moda, İstanbul',
    area: '140 m²',
    client: 'Özel',
    cover: '/images/p-16.jpg',
    summary:
      'Bir fotoğrafçı için tasarlanan, gün ışığını malzeme gibi kullanan stüdyo.',
    description: [
      'Stüdyo Işık, kuzey ışığının yumuşaklığını kayar perdeler ve beyaz yüzeylerle yöneten bir çalışma mekânı. Mekân, ışığı çekip bırakabilen bir enstrümana dönüştü.',
      'Mobilyalar duvara katlanıyor, zemin boşalıyor; böylece aynı oda çekim, kurgu ve sergi arasında saniyeler içinde dönüşüyor. Detaylar kasıtlı olarak sessiz tutuldu.',
    ],
    services: ['İç Mimari', 'Aydınlatma Tasarımı'],
    gallery: ['/images/p-18.jpg', '/images/p-05.jpg', '/images/p-07.jpg'],
    featured: false,
  },
];

export const getFeatured = () => projects.filter((p) => p.featured);
export const getBySlug = (slug) => projects.find((p) => p.slug === slug);
