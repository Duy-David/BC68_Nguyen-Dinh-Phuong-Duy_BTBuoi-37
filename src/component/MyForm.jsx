import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputCustom from "./InputCustom";
import * as yup from "yup";
import TableSinhVien from "./TableSinhVien";
import { useDispatch, useSelector } from "react-redux";
import sinhVienSlice, { themSinhVien } from "../redux/sinhVienSlice";
const MyForm = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);

  const { sinhVien } = useSelector((state) => state.sinhVienSlice);
  const dispatch = useDispatch();
  console.log(sinhVien);

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
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
      const newArrSinhVien = [...arrSinhVien, values];
      setArrSinhVien(newArrSinhVien);
      dispatch(themSinhVien(values));
      resetForm();
    },
    // validationSchema: yup.object({
    //   email: yup
    //     .string()
    //     .email("Vui lòng nhập định dạng email")
    //     .required("Vui lòng không được bỏ trống"),
    //   tenSinhVien: yup.string().required("Vui lòng không được bỏ trống"),
    //   mssv: yup
    //     .string()
    //     .required("Vui lòng không được bỏ trống")
    //     .max(4, "Vui lòng nhập ít hơn 4 ký tự"),
    //   soDienThoai: yup
    //     .string()
    //     .matches(
    //       /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
    //       "Vui lòng nhập đúng định dạng số điện thoại"
    //     )
    //     .required("Vui lòng không được bỏ trống"),
    // }),
  });
  useEffect(() => {
    if (arrSinhVien.length > 0) {
      setArrSinhVien(sinhVien);
    }
  }, [sinhVien]);

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
              placeHolder={"Vui lòng nhập tên nhân viên"}
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
              onBlur={onblur}
              errors={errors.soDienThoai}
              touched={touched.soDienThoai}
            />
            <InputCustom
              contentLabel={" Email"}
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
                Thêm nhân viên
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-500 text-white rounded-lg"
              >
                Reset form
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-500 text-white rounded-lg"
              >
                cập nhật nhân viên
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container mt-6">
        <TableSinhVien
          // handleDeleteNhanVien={handleDeleteNhanVien}
          arrSinhVien={arrSinhVien}
          // handleGetNhanVien={handleGetNhanVien}
        />
      </div>
    </>
  );
};

export default MyForm;
