/*
Created		01/04/2022
Modified		24/04/2022
Project		
Model		
Company		
Author		
Version		
Database		MS SQL 7 
*/


Create table [BenChoThue] (
	[MaBCT] Nvarchar(255) NOT NULL,
	[TenBCT] Nvarchar(255) NOT NULL,
	[DiaChi] Ntext NOT NULL,
	[GiaTrungBinh] Float NOT NULL,
	[SoSao] Integer NOT NULL,
	[LuotDanhGia] Integer NOT NULL,
	[MoTa] Ntext NULL,
	[MaLoaiLuuTru] Nvarchar(255) NOT NULL,
	[DiemTienLoi] Float NOT NULL,
Primary Key  ([MaBCT])
) 
go

Create table [LoaILuuTru] (
	[MaLoaiLuuTru] Nvarchar(255) NOT NULL,
	[TenLoaiLuuTru] Nvarchar(255) NOT NULL,
Primary Key  ([MaLoaiLuuTru])
) 
go

Create table [TienNghiBenChoThue] (
	[MaTienNghiBCT] Nvarchar(255) NOT NULL,
	[TenTienNghiBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaTienNghiBCT])
) 
go

Create table [HinhAnhBCT] (
	[MaHinhAnhBCT] Nvarchar(255) NOT NULL,
	[URLImageBCT] Text NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaHinhAnhBCT])
) 
go

Create table [CanHo] (
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
	[TenCanHo] Nvarchar(255) NOT NULL,
	[DienTich] Nvarchar(255) NOT NULL,
	[Gia] Float NOT NULL,
	[SoLuongKhach] Integer NOT NULL,
	[MoTa] Ntext NULL,
	[SoLuongCon] Integer NOT NULL,
	[ThongTinGiuong] Nvarchar(255) NOT NULL,
Primary Key  ([MaCanHo],[MaBCT])
) 
go

Create table [KhachHang] (
	[MaKhachHang] Nvarchar(255) NOT NULL,
	[Ten] Nvarchar(255) NOT NULL,
	[Email] Nvarchar(255) NOT NULL,
	[SDT] Nvarchar(255) NOT NULL,
	[YeuCau] Ntext NOT NULL,
Primary Key  ([MaKhachHang])
) 
go

Create table [PhieuDatPhong] (
	[MaDatPhong] Nvarchar(255) NOT NULL,
	[Thue] Nvarchar(255) NOT NULL,
	[TongTien] Float NOT NULL,
	[NgayTao] Datetime NOT NULL,
	[TrangThai] Bit NOT NULL,
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaKhachHang] Nvarchar(255) NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaDatPhong],[MaCanHo],[MaKhachHang],[MaBCT])
) 
go

Create table [TienNghiCanHo] (
	[MaTienNghiCanHo] Nvarchar(255) NOT NULL,
	[TenTienNghiCanHo] Nvarchar(255) NOT NULL,
Primary Key  ([MaTienNghiCanHo])
) 
go

Create table [HinhAnhCanHo] (
	[MaHinhAnhCanHo] Nvarchar(255) NOT NULL,
	[URLImageCanHo] Text NOT NULL,
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaHinhAnhCanHo])
) 
go

Create table [BenChoThue_TienNghiBenChoThue] (
	[MaBCT] Nvarchar(255) NOT NULL,
	[MaTienNghiBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaBCT],[MaTienNghiBCT])
) 
go

Create table [ChiTietDatPhong] (
	[MaChiTietDatPhong] Nvarchar(255) NOT NULL,
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaDatPhong] Nvarchar(255) NOT NULL,
	[MaKhachHang] Nvarchar(255) NOT NULL,
	[TongTienCanHo] Float NOT NULL,
	[SoLuongCanHo] Integer NOT NULL,
	[ThoiGianNhan] Datetime NOT NULL,
	[ThoiGianTra] Datetime NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaChiTietDatPhong],[MaCanHo],[MaDatPhong],[MaKhachHang],[MaBCT])
) 
go

Create table [CanHo_TienNghiCanHo] (
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaTienNghiCanHo] Nvarchar(255) NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaCanHo],[MaTienNghiCanHo],[MaBCT])
) 
go

Create table [NgayDaDat] (
	[MaNgayDaDat] Nvarchar(255) NOT NULL,
	[NgayDat] Datetime NOT NULL,
	[MaCanHo] Nvarchar(255) NOT NULL,
	[MaBCT] Nvarchar(255) NOT NULL,
Primary Key  ([MaNgayDaDat],[MaCanHo],[MaBCT])
) 
go


Alter table [CanHo] add  foreign key([MaBCT]) references [BenChoThue] ([MaBCT]) 
go
Alter table [HinhAnhBCT] add  foreign key([MaBCT]) references [BenChoThue] ([MaBCT]) 
go
Alter table [BenChoThue_TienNghiBenChoThue] add  foreign key([MaBCT]) references [BenChoThue] ([MaBCT]) 
go
Alter table [BenChoThue] add  foreign key([MaLoaiLuuTru]) references [LoaILuuTru] ([MaLoaiLuuTru]) 
go
Alter table [BenChoThue_TienNghiBenChoThue] add  foreign key([MaTienNghiBCT]) references [TienNghiBenChoThue] ([MaTienNghiBCT]) 
go
Alter table [HinhAnhCanHo] add  foreign key([MaCanHo],[MaBCT]) references [CanHo] ([MaCanHo],[MaBCT]) 
go
Alter table [PhieuDatPhong] add  foreign key([MaCanHo],[MaBCT]) references [CanHo] ([MaCanHo],[MaBCT]) 
go
Alter table [CanHo_TienNghiCanHo] add  foreign key([MaCanHo],[MaBCT]) references [CanHo] ([MaCanHo],[MaBCT]) 
go
Alter table [NgayDaDat] add  foreign key([MaCanHo],[MaBCT]) references [CanHo] ([MaCanHo],[MaBCT]) 
go
Alter table [PhieuDatPhong] add  foreign key([MaKhachHang]) references [KhachHang] ([MaKhachHang]) 
go
Alter table [ChiTietDatPhong] add  foreign key([MaDatPhong],[MaCanHo],[MaKhachHang],[MaBCT]) references [PhieuDatPhong] ([MaDatPhong],[MaCanHo],[MaKhachHang],[MaBCT]) 
go
Alter table [CanHo_TienNghiCanHo] add  foreign key([MaTienNghiCanHo]) references [TienNghiCanHo] ([MaTienNghiCanHo]) 
go


Set quoted_identifier on
go


Set quoted_identifier off
go


