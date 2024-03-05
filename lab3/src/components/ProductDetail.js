import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import '../css/Detail.css';

const ProductDetail = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
  const [refresh, setRefresh] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const [rating, setRating] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:9999/product/${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setComment(data.comments);
      });
  }, [pid, refresh]);

  const postData = async (e) => {
    e.preventDefault();
    const url = "http://localhost:9999/comment";

    const data = {
      content: content,
      pid: pid,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefresh(refresh === 1 ? 2 : 1);
      setContent("");
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleMiniImage = (imageId) => {
    console.log(`${imageId} clicked.`);
    setSelectedImage(imageId);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:9999/product/${pid}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Refresh the product data after rating submission
      setRefresh(refresh === 1 ? 2 : 1);
      setRating(0);
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Failed to submit rating');
    }
  };
  

  return (
    <Container className="container">
      <Row className="text-left">
        <Row>ID: {pid}</Row>
      </Row>
      <Row>
        <Col xs={6}>
          <Row>
            <Carousel>
              {product.images && product.images.map((images) => (
                <Carousel.Item key={images._id}>
                  <img
                    src={images.url}
                    className="d-block w-100"
                    alt="Product Image"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
          <Row className="mt-3">
            {product.images && product.images.map((image) => (
              <Col key={image._id} xs={2} className="mb-2">
                <img
                  src={image.url}
                  className="d-block w-100"
                  alt="Mini Product Image"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleMiniImage(image._id)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={6}>
          <Row>Name: {product.name}</Row>
          <Row>Price: {product.price}</Row>
        </Col>
      </Row>
      <Row>
        <Row>Description: {product.description}</Row>
      </Row>

      <Row> Comments:</Row>
      {comment.map((comment) => (
        <Row key={comment._id} className="comments-section">
          <Row>
            <Col xs={6}>
              {comment.author}
            </Col>
            <Col xs={6}>
              <StarRating value={comment.rating} readOnly />
            </Col>
          </Row>

          <Row className="content">{comment.text}</Row>

        </Row>
      ))}


      <Row className="form-comment">
        <Row>
          <Form className="d-flex" onSubmit={postData}>
            <FormControl
              type="text"
              placeholder="Enter your text..."
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit">send</Button>
          </Form>
        </Row>
      </Row>
    </Container>
  );
};

export default ProductDetail;
