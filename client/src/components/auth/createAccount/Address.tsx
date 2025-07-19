import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import { Col, Row } from "antd";

const AddressInfo = () => {
  return (
    <>
      <div className="border border-gray-300 rounded-md p-4 my-4">
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="address.division"
              placeholder="Enter division"
              label="Division"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="address.district"
              placeholder="Enter district"
              label="District"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="address.upazila"
              placeholder="Enter upazila"
              label="Upazila"
              size="large"
              required
            />
          </Col>
          <Col xs={24} md={12} lg={12} className="mt-3">
            <FormInput
              name="address.union"
              placeholder="Enter union"
              label="Union"
              size="large"
              required
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddressInfo;
