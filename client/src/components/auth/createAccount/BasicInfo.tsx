import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import { Col, Row } from "antd";

const BasicInfoForm = () => {
  return (
    <>
      <div className="border bg-white border-gray-300 rounded-md p-4 my-4">
        {/* <UploadImage name="profile_picture" defaultImageUrl={defaultImageUrl} /> */}
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="first_name"
              placeholder="Enter First Name"
              label="First Name"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="last_name"
              placeholder="Enter Last Name"
              label="Last Name"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="mobile"
              placeholder="Enter Phone Number"
              label="Phone Number"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="email"
              placeholder="Enter your email"
              label="Email"
              type="email"
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
          <Col xs={24} md={12} lg={8} className="mt-3">
            <FormInput
              name="nid"
              placeholder="Enter your nid Number"
              label="National identity card"
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
