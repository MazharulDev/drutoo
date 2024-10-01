import FormDatePicker from "@/components/forms/FormDatePicker";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import { Col, Row } from "antd";

const AddressInfo = () => {
  return (
    <>
      <div className="border bg-white border-gray-300 rounded-md p-4 my-4">
        <Row gutter={{ xs: 4, md: 20 }}>
          <Col xs={24} md={12} lg={8} className="mt-3"></Col>
        </Row>
      </div>
    </>
  );
};

export default AddressInfo;
