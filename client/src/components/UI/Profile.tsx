"use client";

import { Button, Col, Row } from "antd";
import { SubmitHandler } from "react-hook-form";
import { genderOptions } from "@/constants/global";
import { IProfileInput } from "@/types";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import FormSelectField from "../forms/FormSelectField";
import FormDatePicker from "../forms/FormDatePicker";
import { useProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const UpdateProfile = () => {
  const { userId } = getUserInfo() as any;
  const { data: userData, isLoading } = useProfileQuery(userId);
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const defaultValues = {
    firstName: userData?.name?.firstName || "",
    lastName: userData?.name?.lastName || "",
    email: userData?.email || "",
    mobile: userData?.mobile || "",
    nid: userData?.nid || "",
    gender: userData?.gender?.toLowerCase() || "",
    dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,
    bio: "",
    division: userData?.address?.division || "",
    district: userData?.address?.district || "",
    upazila: userData?.address?.upazila || "",
    union: userData?.address?.union || "",
  };

  const onSubmit: SubmitHandler<IProfileInput> = async (values) => {
    const payload = {
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      email: values.email,
      mobile: values.mobile,
      nid: values.nid,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      address: {
        division: values.division,
        district: values.district,
        upazila: values.upazila,
        union: values.union,
      },
    };

    try {
      console.log(payload);
      await updateMyProfile(payload).unwrap();
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={16}>
          <Col span={12}>
            <FormInput name="firstName" label="First Name" placeholder="Enter first name" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="lastName" label="Last Name" placeholder="Enter last name" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="email" label="Email" type="email" placeholder="Enter email" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput disabled name="mobile" label="Mobile" placeholder="Enter mobile" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="nid" label="NID" placeholder="Enter NID" size="large" required />
          </Col>
          <Col span={12}>
            <FormSelectField
              name="gender"
              label="Gender"
              options={genderOptions}
              placeholder="Select gender"
              size="large"
              required
            />
          </Col>
          <Col span={12}>
            <FormDatePicker name="dateOfBirth" label="Date of Birth" size="large" required />
          </Col>

          {/* Address fields */}
          <Col span={12}>
            <FormInput name="division" label="Division" placeholder="Enter division" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="district" label="District" placeholder="Enter district" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="upazila" label="Upazila" placeholder="Enter upazila" size="large" required />
          </Col>
          <Col span={12}>
            <FormInput name="union" label="Union" placeholder="Enter union" size="large" required />
          </Col>

          <Col span={24}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full bg-green-500 hover:bg-green-600 mt-4"
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateProfile;
