import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  FileCode2,
  Printer,
} from "lucide-react";
import "./resume-theme.css";

const HTML = "/resume/resume.html";
const PDF = "/resume/utsav-vachhani-resume.pdf";

const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// One HTML document powers the on-screen preview AND the generated A4 PDF.
// Resume content is edited only in public/resume/resume.html.
export default function Resume() {
  const previewRef = useRef(null);
  const [height, setHeight] = useState(1320);

  useEffect(() => {
    document.title = "Resume — Utsav Vachhani";
    window.scrollTo(0, 0);
    const update = () => {
      const doc = previewRef.current?.contentDocument;
      if (doc)
        setHeight(
          Math.max(
            doc.documentElement.scrollHeight,
            doc.body?.scrollHeight || 0,
          ) + 4,
        );
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onPreviewLoad = () => {
    const frame = previewRef.current;
    if (!frame?.contentDocument) return;
    const update = () =>
      setHeight(
        Math.max(
          frame.contentDocument.documentElement.scrollHeight,
          frame.contentDocument.body.scrollHeight,
        ) + 4,
      );
    update();
    frame.contentDocument.fonts?.ready.then(update);
  };

  const printResume = () => previewRef.current?.contentWindow?.print();

  return (
    <div className="resume-page">
      <nav className="resume-nav" aria-label="Resume toolbar">
        <div className="resume-nav-inner shell">
          <a href="/#home" className="resume-back">
            <ArrowLeft size={17} /> BACK TO PORTFOLIO
          </a>
          <div className="resume-toolbar-actions">
            <button
              type="button"
              className="resume-print"
              onClick={printResume}
              title="Print or Save as PDF via browser dialog"
            >
              <Printer size={16} /> Print / Save as PDF
            </button>
            <a
              href={HTML}
              download="Utsav_Vachhani_Resume.html"
              className="button button-ghost resume-download-html"
              onClick={(e) => {
                e.preventDefault();
                downloadFile(HTML, "Utsav_Vachhani_Resume.html");
              }}
              title="Download standalone HTML resume"
            >
              <FileCode2 size={16} /> Download HTML
            </a>
            <a
              href={PDF}
              download="Utsav_Vachhani_Resume.pdf"
              className="button button-lime resume-download"
              onClick={(e) => {
                e.preventDefault();
                downloadFile(PDF, "Utsav_Vachhani_Resume.pdf");
              }}
              title="Download generated A4 PDF resume"
            >
              <Download size={16} /> Download A4 PDF
            </a>
          </div>
        </div>
      </nav>
      <div className="resume-preview-wrap">
        <iframe
          ref={previewRef}
          src={HTML}
          title="Classic white Resume — HTML preview"
          onLoad={onPreviewLoad}
          className="resume-preview"
          style={{ height: `${height}px` }}
          scrolling="no"
        />
      </div>
      <div className="resume-bottom-actions">
        <a href="/#projects">
          Explore projects <ArrowUpRight size={16} />
        </a>
        <a
          href={HTML}
          download="Utsav_Vachhani_Resume.html"
          onClick={(e) => {
            e.preventDefault();
            downloadFile(HTML, "Utsav_Vachhani_Resume.html");
          }}
        >
          <FileCode2 size={16} /> Download HTML Resume
        </a>
        <a
          href={PDF}
          download="Utsav_Vachhani_Resume.pdf"
          onClick={(e) => {
            e.preventDefault();
            downloadFile(PDF, "Utsav_Vachhani_Resume.pdf");
          }}
        >
          <Download size={16} /> Download A4 PDF
        </a>
        <a href={HTML} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight size={16} /> Open in new tab
        </a>
      </div>
    </div>
  );
}
