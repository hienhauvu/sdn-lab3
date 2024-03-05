import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const filesArray = Array.from(e.target.files);

      const updatedImages = filesArray.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              image: URL.createObjectURL(file),
              imageName: file.name,
              imageSize: file.size,
              imageBase64: reader.result,
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(updatedImages).then((images) => {
        setFormData({
          ...formData,
          images: images,
        });
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9999/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      alert("Product created successfully. Click ok to view detail");
      navigate(`/detail/${data._id}`);
    } catch (error) {
      console.log("Error occurred:", error);
      alert("Failed to create product");
    }
  };
  // console.log(formData);
  // console.log(category[0]._id);
  // const defaultValueCate = category.length > 0 ? category[0]._id : "";
  const defaultValueCate = formData.category || (category.length > 0 ? category[0]._id : "");


  return (
    <Container>
      <Row className="justify-content-md-center pt-200">
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required={true}
                type="text"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required={true}
                type="number"
                name="price"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                required={true}
                name="description"
                rows={3}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={defaultValueCate}
                onChange={handleChange}
              >
                <option value="">Select a category</option> 
                {category.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required={true}
                name="image"
                onChange={handleChange}
                multiple
              />{" "}
              {/* {formData.images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img.imageBase64}
                    alt="Uploaded"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                </div>
              ))} */}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;