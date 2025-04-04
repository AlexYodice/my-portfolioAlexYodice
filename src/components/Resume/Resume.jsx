import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/YOUR_RESUME.pdf"; // Update with your actual PDF file
import { AiOutlineDownload } from "react-icons/ai";
import { FaCog } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <Row className="resume-header">
          <Col md={12} className="text-center">
            <h1 style={{ fontSize: "2.6em" }}>
              My <span className="purple">Resume</span> <FaCog className="settings-icon" />
            </h1>
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            className="download-button"
          >
            <AiOutlineDownload />&nbsp;Download Resume
          </Button>
        </Row>

        <Row className="resume-pdf-container">
          <Col md={12} className="pdf-viewer">
            <div className="pdf-controls">
              <button 
                onClick={() => setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1)}
                disabled={pageNumber <= 1}
                className="page-nav-btn"
              >
                &lt;
              </button>
              <span>
                {pageNumber} / {numPages || 1}
              </span>
              <button 
                onClick={() => setPageNumber(pageNumber < numPages ? pageNumber + 1 : pageNumber)}
                disabled={pageNumber >= numPages}
                className="page-nav-btn"
              >
                &gt;
              </button>
              <button 
                onClick={() => setScale(scale - 0.1)}
                className="zoom-btn"
                disabled={scale <= 0.5}
              >
                -
              </button>
              <span>{Math.round(scale * 100)}%</span>
              <button 
                onClick={() => setScale(scale + 0.1)}
                className="zoom-btn"
                disabled={scale >= 2.0}
              >
                +
              </button>
            </div>
            
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdf-document"
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pdf-page"
              />
            </Document>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Resume; 