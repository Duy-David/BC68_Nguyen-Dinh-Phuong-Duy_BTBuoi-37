import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputCustom from "./InputCustom";
import * as yup from "yup";
import TableSinhVien from "./TableSinhVien";
import { useDispatch, useSelector } from "react-redux";
import sinhVienSlice, {
  capNhatSinhVien,
  themSinhVien,
  xoaSinhVien,
  timKiemSinhVien,
} from "../redux/sinhVienSlice";
const MyForm = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
  const [editingSinhVien, setEditingSinhVien] = useState(false);
  const { sinhVien } = useSelector((state) => state.sinhVienSlice);
  const dispatch = useDispatch();
  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    handleReset,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      mssv: "",
      tenSinhVien: "",
      soDienThoai: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      const mssvExists = sinhVien.some((sv) => sv.mssv === values.mssv);
      const tenSinhVienExists = sinhVien.some(
        (sv) => sv.tenSinhVien === values.tenSinhVien
      );
      const soDienThoaiExists = sinhVien.some(
        (sv) => sv.soDienThoai === values.soDienThoai
      );
      const emailExists = sinhVien.some((sv) => sv.email === values.email);

      if (mssvExists || tenSinhVienExists || soDienThoaiExists || emailExists) {
        alert(
          "MSSV, tên, số điện thoại hoặc email đã tồn tại. Vui lòng nhập thông tin khác."
        );
        return;
      }
      const newArrSinhVien = [...arrSinhVien, values];
      if (editingSinhVien) {
        dispatch(capNhatSinhVien(values));
        setEditingSinhVien(false);
      } else {
        dispatch(themSinhVien(values));
      }
      setArrSinhVien(newArrSinhVien);
      resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .email("Vui lòng nhập định dạng email"),
      tenSinhVien: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .matches(
          /^[A-Za-zÀ-ỹà-ỹ-Z\s]+$/,
          "Vui lòng nhập tên không phải chử số"
        ),
      mssv: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .length(4, "Vui lòng nhập đúng 4 ký tự"),
      soDienThoai: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .matches(
          /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
          "Vui lòng nhập đúng định dạng số điện thoại"
        ),
    }),
  });
  useEffect(() => {
    if (arrSinhVien.length > 0) {
      setArrSinhVien(sinhVien);
    }
  }, [sinhVien]);
  useEffect(() => {
    editingSinhVien && setValues(editingSinhVien);
  }, [editingSinhVien]);

  const handleDeleteSinhVien = (mssv) => {
    const newArrSinhVien = [...arrSinhVien];
    dispatch(xoaSinhVien(mssv));
    setArrSinhVien(newArrSinhVien);
  };

  const handleEditSinhVien = (editingSinhVien) => {
    setEditingSinhVien(editingSinhVien);
  };
  const handleSearchSinhVien = (event) => {
    console.log(event.target.value);
    dispatch(timKiemSinhVien(event.target.value));
    // timKiemSinhVien(event.target.value);
  };
  //  console.log(arrSinhVien)

  return (
    <>
      <h2 className="px-28 py-5 text-3xl bg-gray-700 text-white">
        Thông Tin Sinh Viên
      </h2>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <InputCustom
              contentLabel={"Mã Sinh Viên"}
              placeHolder={"Vui lòng nhập MSSV"}
              name={"mssv"}
              onChange={handleChange}
              value={values.mssv}
              onBlur={handleBlur}
              errors={errors.mssv}
              touched={touched.mssv}
            />
            <InputCustom
              contentLabel={"Tên Sinh viên"}
              placeHolder={"Vui lòng nhập tên Sinh viên"}
              name={"tenSinhVien"}
              onChange={handleChange}
              value={values.tenSinhVien}
              onBlur={handleBlur}
              errors={errors.tenSinhVien}
              touched={touched.tenSinhVien}
            />
            <InputCustom
              contentLabel={"Số điện thoại"}
              placeHolder={"Vui lòng nhập Số điện thoại"}
              name={"soDienThoai"}
              onChange={handleChange}
              value={values.soDienThoai}
              onBlur={handleBlur}
              errors={errors.soDienThoai}
              touched={touched.soDienThoai}
            />
            <InputCustom
              contentLabel={"Email"}
              placeHolder={"Vui lòng nhập Email"}
              name={"email"}
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />

            <div className="space-x-5">
              <button
                type="submit"
                className="py-2 px-5 bg-green-500 text-white rounded-lg"
              >
                {editingSinhVien ? "Cập nhật Sinh Viên" : "Thêm Sinh Viên"}
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-500 text-white rounded-lg"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className=" container  mt-6 grid grid-cols-12 gap-4 ">
        <div className="form-group col-span-10 ">
          <input
            placeholder="Nhập mã sinh viên để tìm kiếm sinh viên"
            type="text"
            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            onChange={handleSearchSinhVien}
          />
        </div>
        <div className=" col-span-1 ">
          <button className="bg-blue-500 text-white py-2 px-5 text-center rounded-lg ">
            Search
          </button>
        </div>
      </div>

      <div className="container mt-6 ">
        <TableSinhVien
          handleDeleteSinhVien={handleDeleteSinhVien}
          arrSinhVien={arrSinhVien}
          handleEditSinhVien={handleEditSinhVien}
        />
      </div>
    </>
  );
};

export default MyForm;
