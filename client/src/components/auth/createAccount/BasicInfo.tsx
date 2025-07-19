import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import UploadImage from "@/components/forms/UploadImage";
import {
  bloodGroupOptions,
  genderOptions,
  roleOptions,
} from "@/constants/global";
import { Col, Row } from "antd";

const BasicInfoForm = ({ defaultImageUrl }: { defaultImageUrl?: string }) => {
  return (
    <>
      <div className="border border-gray-300 rounded-md p-4 my-4">
        <UploadImage name="profilePicture" defaultImageUrl={defaultImageUrl} />
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="name.firstName"
              placeholder="Enter First Name"
              label="First Name"
              size="large"
              required
              validation={{
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "First Name can only contain letters and spaces",
                },
              }}
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="name.lastName"
              placeholder="Enter Last Name"
              label="Last Name"
              size="large"
              required
              validation={{
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Last Name can only contain letters and spaces",
                },
              }}
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormDatePicker
              name="dateOfBirth"
              label="Date of birth"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormSelectField
              name="gender"
              options={genderOptions}
              placeholder="Select gender"
              label="Gender"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormSelectField
              name="bloodGroup"
              options={bloodGroupOptions}
              placeholder="Select bloodGroup"
              label="BloodGroup"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormSelectField
              name="role"
              options={roleOptions}
              placeholder="Select role"
              label="User role"
              size="large"
              required
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BasicInfoForm;
