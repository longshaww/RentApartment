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

const BillRelations = [
  'canHo',
  'maKhachHang2',
  'canHo.maBct2',
  'canHo.maBct2.hinhAnhBcts',
];

const BookedDateRelation = ['canHo'];

export {
  LessorRelations,
  ApartmentRelations,
  BookedDateRelation,
  BillRelations,
};
