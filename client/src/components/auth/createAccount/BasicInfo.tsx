import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { Col, Row } from "antd";

const BasicInfoForm = () => {
  return (
    <>
      <div className="border bg-white border-gray-300 rounded-md p-4 my-4">
        {/* <UploadImage name="profile_picture" defaultImageUrl={defaultImageUrl} /> */}
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="name.firstName"
              placeholder="Enter First Name"
              label="First Name"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="name.lastName"
              placeholder="Enter Last Name"
              label="Last Name"
              size="large"
              required
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
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormSelectField
              name="gender"
              options={genderOptions}
              placeholder="Select gender"
              label="Gender"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormSelectField
              name="bloodGroup"
              options={bloodGroupOptions}
              placeholder="Select bloodGroup"
              label="BloodGroup"
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
