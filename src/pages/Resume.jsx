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
            >
              <Printer size={16} /> Print / Save as PDF
            </button>
            <a
              href={PDF}
              download="Utsav_Vachhani_Resume.pdf"
              className="button button-lime resume-download"
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
        <a href={HTML} target="_blank" rel="noopener noreferrer">
          <FileCode2 size={16} /> Open standalone HTML
        </a>
        <a href={PDF} download="Utsav_Vachhani_Resume.pdf">
          <Download size={16} /> Download A4 PDF
        </a>
      </div>
    </div>
  );
}
