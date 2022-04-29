const LessorRelations = [
  'maLoaiLuuTru',
  // 'canHos.hinhAnhCanHos',
  // 'canHos',
  'hinhAnhBcts',
];

const ApartmentRelations = [
  'maBct2',
  // 'ngayDaDats',
  'hinhAnhCanHos',
  'phieuDatPhongs',
  'phieuDatPhongs.chiTietDatPhongs',
];

const BookedDateRelation = ['canHo'];

export { LessorRelations, ApartmentRelations, BookedDateRelation };
