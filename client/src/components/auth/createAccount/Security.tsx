import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import { Col, Row } from "antd";

const SecurityStep = () => {
  return (
    <>
      <div className="border border-gray-300 rounded-md p-4 my-4">
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="nid"
              placeholder="Enter your nid Number"
              label="National identity card"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="mobile"
              placeholder="Enter Phone Number"
              label="Phone Number"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="email"
              placeholder="Enter your email"
              label="Email"
              type="email"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="pin"
              placeholder="Enter pin"
              label="Pin"
              size="large"
              type="password"
              required
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SecurityStep;
