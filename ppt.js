const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaExclamationTriangle,
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaCheckCircle,
  FaCogs,
  FaBullseye,
  FaLightbulb,
  FaUsers,
  FaCode,
} = require("react-icons/fa");

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) }),
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function makePPT() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "AI Friday Season 2 - Anomaly Explanation Tool";

  // Color palette: Deep navy + teal + white
  const NAVY = "1A2E4A";
  const TEAL = "0D9488";
  const TEAL_LIGHT = "CCFBF1";
  const WHITE = "FFFFFF";
  const GRAY = "64748B";
  const LIGHT_BG = "F8FAFC";
  const ACCENT = "F59E0B";

  // ─── SLIDE 1: Title ─────────────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: NAVY };

    // Top teal accent band
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: TEAL },
      line: { color: TEAL },
    });

    // TCS badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 0.3,
      w: 1.4,
      h: 0.45,
      fill: { color: TEAL },
      rectRadius: 0.05,
      line: { color: TEAL },
    });
    s.addText("TCS Internal", {
      x: 0.5,
      y: 0.3,
      w: 1.4,
      h: 0.45,
      fontSize: 9,
      color: WHITE,
      bold: true,
      align: "center",
      valign: "middle",
      margin: 0,
    });

    // AI Friday label
    s.addText("AI FRIDAY  ·  SEASON 2", {
      x: 0,
      y: 1.0,
      w: 10,
      h: 0.4,
      fontSize: 13,
      color: TEAL,
      bold: true,
      align: "center",
      charSpacing: 4,
    });

    // Main title
    s.addText("IT Anomaly", {
      x: 0.6,
      y: 1.55,
      w: 8.8,
      h: 0.85,
      fontSize: 52,
      color: WHITE,
      bold: true,
      align: "center",
    });
    s.addText("Explanation Tool", {
      x: 0.6,
      y: 2.3,
      w: 8.8,
      h: 0.85,
      fontSize: 52,
      color: TEAL,
      bold: true,
      align: "center",
    });

    // Subtitle
    s.addText("Powered by Claude AI  ·  Faster Incident Resolution", {
      x: 0.6,
      y: 3.3,
      w: 8.8,
      h: 0.45,
      fontSize: 16,
      color: "A0B4C8",
      align: "center",
      italic: true,
    });

    // Bottom bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 5.25,
      w: 10,
      h: 0.375,
      fill: { color: "0F1E30" },
      line: { color: "0F1E30" },
    });
    s.addText("10 June 2026", {
      x: 0,
      y: 5.25,
      w: 10,
      h: 0.375,
      fontSize: 11,
      color: "A0B4C8",
      align: "center",
      valign: "middle",
      margin: 0,
    });
  }

  // ─── SLIDE 2: The Problem ────────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    // Header
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: NAVY },
      line: { color: NAVY },
    });
    s.addText("The Problem", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });

    const warnIcon = await iconToBase64Png(
      FaExclamationTriangle,
      "#F59E0B",
      256,
    );
    s.addImage({ data: warnIcon, x: 8.8, y: 0.2, w: 0.55, h: 0.55 });

    // 3 problem cards
    const problems = [
      {
        title: "Alarms Go Off…",
        body: "Your monitoring system detects something wrong — CPU spike, slow response, errors rising.",
      },
      {
        title: "…But No Explanation",
        body: 'The tool just says "Anomaly Detected." It doesn\'t tell you WHY it happened or what to fix.',
      },
      {
        title: "Team Wastes Time",
        body: "Engineers spend hours digging through logs and dashboards trying to figure out the root cause manually.",
      },
    ];

    for (let i = 0; i < 3; i++) {
      const x = 0.35 + i * 3.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.25,
        w: 2.95,
        h: 3.8,
        fill: { color: WHITE },
        rectRadius: 0.12,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 8,
          offset: 3,
          angle: 45,
          opacity: 0.1,
        },
        line: { color: "E2E8F0", width: 1 },
      });

      // Number badge
      s.addShape(pres.shapes.OVAL, {
        x: x + 1.2,
        y: 1.1,
        w: 0.55,
        h: 0.55,
        fill: { color: TEAL },
        line: { color: TEAL },
      });
      s.addText(String(i + 1), {
        x: x + 1.2,
        y: 1.1,
        w: 0.55,
        h: 0.55,
        fontSize: 16,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });

      s.addText(problems[i].title, {
        x: x + 0.15,
        y: 1.85,
        w: 2.65,
        h: 0.55,
        fontSize: 15,
        color: NAVY,
        bold: true,
        align: "center",
      });
      s.addText(problems[i].body, {
        x: x + 0.2,
        y: 2.5,
        w: 2.55,
        h: 2.2,
        fontSize: 13,
        color: GRAY,
        align: "center",
        valign: "top",
      });
    }

    // Key stat
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.5,
      y: 5.1,
      w: 7,
      h: 0.4,
      fill: { color: "FEF3C7" },
      rectRadius: 0.05,
      line: { color: ACCENT, width: 1 },
    });
    s.addText(
      "Result: Incidents take much longer to resolve, and service is impacted",
      {
        x: 1.5,
        y: 5.1,
        w: 7,
        h: 0.4,
        fontSize: 12,
        color: "92400E",
        align: "center",
        valign: "middle",
        margin: 0,
      },
    );
  }

  // ─── SLIDE 3: Our Solution ───────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
    s.addText("Our Solution", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });

    const robotIcon = await iconToBase64Png(FaRobot, "#FFFFFF", 256);
    s.addImage({ data: robotIcon, x: 8.8, y: 0.2, w: 0.55, h: 0.55 });

    // Big callout
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 1.2,
      w: 9,
      h: 1.2,
      fill: { color: NAVY },
      rectRadius: 0.12,
      line: { color: NAVY },
    });
    s.addText(
      "An AI-powered dashboard that automatically explains WHY an anomaly happened — in plain English.",
      {
        x: 0.7,
        y: 1.2,
        w: 8.6,
        h: 1.2,
        fontSize: 17,
        color: WHITE,
        align: "center",
        valign: "middle",
      },
    );

    // 4 feature cards
    const features = [
      {
        icon: FaChartLine,
        label: "Detects Anomalies",
        desc: "Monitors CPU, memory, response time, error rates in real-time",
      },
      {
        icon: FaRobot,
        label: "Claude AI Explains",
        desc: "Uses Claude API to generate a plain-language explanation of the root cause",
      },
      {
        icon: FaCogs,
        label: "Filter & Explore",
        desc: "Filter by severity, time range, or service. Drill down into any anomaly",
      },
      {
        icon: FaCheckCircle,
        label: "Feedback Loop",
        desc: "Engineers rate explanations. AI learns and improves over time",
      },
    ];

    for (let i = 0; i < 4; i++) {
      const x = 0.35 + (i % 2) * 4.8;
      const y = 2.65 + Math.floor(i / 2) * 1.4;
      const iconData = await iconToBase64Png(features[i].icon, "#" + TEAL, 256);

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 4.5,
        h: 1.2,
        fill: { color: WHITE },
        rectRadius: 0.1,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 6,
          offset: 2,
          angle: 45,
          opacity: 0.08,
        },
        line: { color: "E2E8F0", width: 1 },
      });
      s.addImage({ data: iconData, x: x + 0.2, y: y + 0.35, w: 0.45, h: 0.45 });
      s.addText(features[i].label, {
        x: x + 0.75,
        y: y + 0.15,
        w: 3.5,
        h: 0.38,
        fontSize: 14,
        color: NAVY,
        bold: true,
      });
      s.addText(features[i].desc, {
        x: x + 0.75,
        y: y + 0.55,
        w: 3.5,
        h: 0.55,
        fontSize: 11.5,
        color: GRAY,
      });
    }
  }

  // ─── SLIDE 4: How It Works ───────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: NAVY },
      line: { color: NAVY },
    });
    s.addText("How It Works", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });
    s.addText("(Simple 4-Step Flow)", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 14,
      color: "A0B4C8",
      align: "right",
      valign: "middle",
    });

    const steps = [
      {
        num: "1",
        title: "Data Comes In",
        body: "Metrics like CPU %, response time, and error counts stream in from your monitoring tools (every few seconds).",
        color: "0D9488",
      },
      {
        num: "2",
        title: "AI Spots the Anomaly",
        body: "Our system compares current values to normal patterns. If something looks unusual, it flags it automatically.",
        color: "0369A1",
      },
      {
        num: "3",
        title: "Claude Explains It",
        body: "The anomaly data is sent to Claude (Anthropic's AI). Claude reads the data and writes a plain-English explanation.",
        color: "7C3AED",
      },
      {
        num: "4",
        title: "You See the Dashboard",
        body: "Engineers open the dashboard, see the anomaly, read the explanation, and resolve the issue — fast.",
        color: "B45309",
      },
    ];

    for (let i = 0; i < 4; i++) {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.15,
        w: 2.22,
        h: 4.0,
        fill: { color: WHITE },
        rectRadius: 0.12,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 8,
          offset: 3,
          angle: 45,
          opacity: 0.1,
        },
        line: { color: "E2E8F0", width: 1 },
      });

      // Colored top circle
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.74,
        y: 1.05,
        w: 0.75,
        h: 0.75,
        fill: { color: steps[i].color },
        line: { color: steps[i].color },
      });
      s.addText(steps[i].num, {
        x: x + 0.74,
        y: 1.05,
        w: 0.75,
        h: 0.75,
        fontSize: 22,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });

      s.addText(steps[i].title, {
        x: x + 0.12,
        y: 2.0,
        w: 1.98,
        h: 0.6,
        fontSize: 13.5,
        color: NAVY,
        bold: true,
        align: "center",
      });
      s.addText(steps[i].body, {
        x: x + 0.12,
        y: 2.7,
        w: 1.98,
        h: 2.1,
        fontSize: 11.5,
        color: GRAY,
        align: "center",
      });

      // Arrow between cards
      if (i < 3) {
        s.addShape(pres.shapes.RECTANGLE, {
          x: x + 2.22,
          y: 3.1,
          w: 0.16,
          h: 0.04,
          fill: { color: TEAL },
          line: { color: TEAL },
        });
      }
    }
  }

  // ─── SLIDE 5: The Tech Stack ─────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
    s.addText("What We're Building With", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });
    s.addText("(Tech Stack — No Jargon)", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 13,
      color: "CCFBF1",
      align: "right",
      valign: "middle",
    });

    const codeIcon = await iconToBase64Png(FaCode, "#" + TEAL, 256);
    const layers = [
      {
        layer: "AI Brain",
        tool: "Claude API (Anthropic)",
        what: "We send it anomaly data, it sends back a human-readable explanation. No AI training needed — we just use it like a very smart assistant.",
        color: "7C3AED",
        bg: "F5F3FF",
      },
      {
        layer: "Anomaly Detector",
        tool: "Python + Isolation Forest / Z-Score",
        what: "Math that compares current readings to historical patterns and raises an alert when something is unusual.",
        color: "0369A1",
        bg: "EFF6FF",
      },
      {
        layer: "Dashboard UI",
        tool: "React (web app)",
        what: "The screen engineers see — a timeline of anomalies, filter controls, and the AI explanation panel.",
        color: "0D9488",
        bg: "F0FDFA",
      },
      {
        layer: "Data Source",
        tool: "Time-series metrics + monitoring APIs",
        what: "CPU %, memory, latency, error rates — the raw numbers that feed into everything above.",
        color: "B45309",
        bg: "FFFBEB",
      },
    ];

    for (let i = 0; i < 4; i++) {
      const y = 1.2 + i * 1.03;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.4,
        y,
        w: 9.2,
        h: 0.92,
        fill: { color: layers[i].bg },
        rectRadius: 0.08,
        line: { color: "E2E8F0", width: 1 },
      });

      // Layer badge
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.55,
        y: y + 0.18,
        w: 1.5,
        h: 0.55,
        fill: { color: layers[i].color },
        rectRadius: 0.06,
        line: { color: layers[i].color },
      });
      s.addText(layers[i].layer, {
        x: 0.55,
        y: y + 0.18,
        w: 1.5,
        h: 0.55,
        fontSize: 11,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });

      s.addText(layers[i].tool, {
        x: 2.2,
        y: y + 0.1,
        w: 4.0,
        h: 0.38,
        fontSize: 14,
        color: NAVY,
        bold: true,
      });
      s.addText(layers[i].what, {
        x: 2.2,
        y: y + 0.5,
        w: 7.2,
        h: 0.35,
        fontSize: 11,
        color: GRAY,
      });
    }
  }

  // ─── SLIDE 6: Data Considerations ───────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: NAVY },
      line: { color: NAVY },
    });
    s.addText("Data — What We Use & How", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });

    const dbIcon = await iconToBase64Png(FaDatabase, "#" + TEAL, 256);
    s.addImage({ data: dbIcon, x: 8.8, y: 0.22, w: 0.5, h: 0.5 });

    const items = [
      {
        title: "What data do we need?",
        points: [
          "CPU usage, memory, response time, error rates",
          "Historical logs so AI knows what's 'normal'",
          "Anomaly labels from your existing monitoring tools",
        ],
        color: "0D9488",
      },
      {
        title: "How do we keep it safe?",
        points: [
          "Use synthetic (fake but realistic) data for testing",
          "Anonymize real data before feeding to AI",
          "No personal customer data is used",
        ],
        color: "0369A1",
      },
      {
        title: "How do we keep it accurate?",
        points: [
          "Normalize data (put all numbers on same scale)",
          "Run correlation analysis (which metrics move together?)",
          "Focus on recent events — historical data supports context",
        ],
        color: "7C3AED",
      },
    ];

    for (let i = 0; i < 3; i++) {
      const x = 0.35 + i * 3.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.2,
        w: 2.95,
        h: 3.85,
        fill: { color: WHITE },
        rectRadius: 0.12,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 6,
          offset: 2,
          angle: 45,
          opacity: 0.09,
        },
        line: { color: "E2E8F0", width: 1 },
      });

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.15,
        y: 1.25,
        w: 2.65,
        h: 0.55,
        fill: { color: items[i].color },
        rectRadius: 0.06,
        line: { color: items[i].color },
      });
      s.addText(items[i].title, {
        x: x + 0.15,
        y: 1.25,
        w: 2.65,
        h: 0.55,
        fontSize: 12,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });

      s.addText(
        items[i].points
          .map((p) => ({
            text: p,
            options: { bullet: true, breakLine: true, paraSpaceAfter: 6 },
          }))
          .concat([{ text: "" }]),
        { x: x + 0.2, y: 1.95, w: 2.55, h: 2.8, fontSize: 12, color: GRAY },
      );
    }
  }

  // ─── SLIDE 7: Success Metrics ────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: NAVY };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
    s.addText("What Does Success Look Like?", {
      x: 0.5,
      y: 0.2,
      w: 9,
      h: 0.7,
      fontSize: 30,
      color: WHITE,
      bold: true,
      align: "center",
    });
    s.addText("The goals we're aiming for", {
      x: 0,
      y: 0.85,
      w: 10,
      h: 0.35,
      fontSize: 14,
      color: "A0B4C8",
      align: "center",
      italic: true,
    });

    // Two big metric cards
    const metrics = [
      {
        number: "85%",
        label: "Explanation Accuracy",
        detail:
          "At least 85 out of 100 AI explanations are rated as correct or useful by engineers",
        color: TEAL,
      },
      {
        number: "30%",
        label: "Faster Incident Resolution",
        detail:
          "Mean Time To Resolve (MTTR) drops by 30% — incidents that used to take 60 min now take ~42 min",
        color: ACCENT,
      },
    ];

    for (let i = 0; i < 2; i++) {
      const x = 0.6 + i * 4.8;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.35,
        w: 4.2,
        h: 2.8,
        fill: { color: "162840" },
        rectRadius: 0.15,
        line: { color: metrics[i].color, width: 2 },
      });
      s.addText(metrics[i].number, {
        x,
        y: 1.55,
        w: 4.2,
        h: 1.0,
        fontSize: 64,
        color: metrics[i].color,
        bold: true,
        align: "center",
      });
      s.addText(metrics[i].label, {
        x: x + 0.2,
        y: 2.6,
        w: 3.8,
        h: 0.5,
        fontSize: 16,
        color: WHITE,
        bold: true,
        align: "center",
      });
      s.addText(metrics[i].detail, {
        x: x + 0.2,
        y: 3.15,
        w: 3.8,
        h: 0.8,
        fontSize: 11.5,
        color: "A0B4C8",
        align: "center",
      });
    }

    // What we'll demo
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.2,
      y: 4.35,
      w: 7.6,
      h: 0.8,
      fill: { color: "0F1E30" },
      rectRadius: 0.1,
      line: { color: TEAL, width: 1 },
    });
    s.addText(
      "Live Demo: Real-time anomaly detection + Claude AI explanation + interactive exploration",
      {
        x: 1.2,
        y: 4.35,
        w: 7.6,
        h: 0.8,
        fontSize: 13,
        color: TEAL_LIGHT,
        align: "center",
        valign: "middle",
      },
    );
  }

  // ─── SLIDE 8: Why Claude API ─────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
    s.addText("Why Claude AI?", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });

    const robotIcon = await iconToBase64Png(FaRobot, "#FFFFFF", 256);
    s.addImage({ data: robotIcon, x: 8.8, y: 0.22, w: 0.5, h: 0.5 });

    // Left: how it works visually
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4,
      y: 1.2,
      w: 4.5,
      h: 4.0,
      fill: { color: NAVY },
      rectRadius: 0.12,
      line: { color: NAVY },
    });
    s.addText("How We Use Claude API", {
      x: 0.6,
      y: 1.35,
      w: 4.1,
      h: 0.45,
      fontSize: 15,
      color: TEAL,
      bold: true,
      align: "center",
    });

    const apiSteps = [
      "Anomaly is detected (e.g. CPU at 98%)",
      "We package the metrics + context into a prompt",
      'We call Claude API: "Explain this anomaly"',
      "Claude responds in plain English within seconds",
      "Response is shown on the engineer's dashboard",
    ];
    for (let i = 0; i < apiSteps.length; i++) {
      s.addShape(pres.shapes.OVAL, {
        x: 0.55,
        y: 1.9 + i * 0.6,
        w: 0.35,
        h: 0.35,
        fill: { color: TEAL },
        line: { color: TEAL },
      });
      s.addText(String(i + 1), {
        x: 0.55,
        y: 1.9 + i * 0.6,
        w: 0.35,
        h: 0.35,
        fontSize: 10,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });
      s.addText(apiSteps[i], {
        x: 1.0,
        y: 1.88 + i * 0.6,
        w: 3.7,
        h: 0.38,
        fontSize: 12,
        color: "A0B4C8",
      });
    }

    // Right: why Claude
    const reasons = [
      {
        title: "No Training Needed",
        body: "We don't need to train a custom AI model. Claude already understands IT metrics and log patterns.",
      },
      {
        title: "Plain English Output",
        body: "Claude is built to communicate clearly — perfect for writing explanations non-experts can understand.",
      },
      {
        title: "Combines Context",
        body: "Claude can read multiple inputs at once — metrics, logs, and historical baselines — to give holistic explanations.",
      },
      {
        title: "Easy Integration",
        body: "A single API call. Plug it into any existing monitoring platform with minimal effort.",
      },
    ];

    for (let i = 0; i < 4; i++) {
      const y = 1.2 + i * 1.0;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 5.2,
        y,
        w: 4.4,
        h: 0.88,
        fill: { color: WHITE },
        rectRadius: 0.08,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 5,
          offset: 2,
          angle: 45,
          opacity: 0.08,
        },
        line: { color: "E2E8F0", width: 1 },
      });
      const checkIcon = await iconToBase64Png(FaCheckCircle, "#" + TEAL, 256);
      s.addImage({ data: checkIcon, x: 5.35, y: y + 0.22, w: 0.38, h: 0.38 });
      s.addText(reasons[i].title, {
        x: 5.85,
        y: y + 0.08,
        w: 3.55,
        h: 0.34,
        fontSize: 13,
        color: NAVY,
        bold: true,
      });
      s.addText(reasons[i].body, {
        x: 5.85,
        y: y + 0.46,
        w: 3.55,
        h: 0.34,
        fontSize: 11,
        color: GRAY,
      });
    }
  }

  // ─── SLIDE 9: Team's Approach / Roadmap ──────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: LIGHT_BG };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 1.0,
      fill: { color: NAVY },
      line: { color: NAVY },
    });
    s.addText("Our Approach", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 30,
      color: WHITE,
      bold: true,
      valign: "middle",
    });
    s.addText("How the team will build this", {
      x: 0.5,
      y: 0,
      w: 9,
      h: 1.0,
      fontSize: 14,
      color: "A0B4C8",
      align: "right",
      valign: "middle",
    });

    const usersIcon = await iconToBase64Png(FaUsers, "#" + TEAL, 256);
    s.addImage({ data: usersIcon, x: 8.8, y: 0.22, w: 0.5, h: 0.5 });

    const phases = [
      {
        phase: "Phase 1",
        title: "Build the Data Pipeline",
        tasks: [
          "Generate synthetic time-series data (CPU, memory, latency)",
          "Label anomalies using Isolation Forest algorithm",
          "Set up API connections to monitoring systems",
        ],
        color: TEAL,
      },
      {
        phase: "Phase 2",
        title: "Integrate Claude AI",
        tasks: [
          "Write prompt templates for anomaly explanation",
          "Call Claude API with anomaly + context",
          "Parse and display AI response in dashboard",
        ],
        color: "0369A1",
      },
      {
        phase: "Phase 3",
        title: "Build the Dashboard",
        tasks: [
          "React-based UI with anomaly timeline",
          "Filter by severity, time, service",
          "Explanation panel with feedback buttons (👍/👎)",
        ],
        color: "7C3AED",
      },
      {
        phase: "Phase 4",
        title: "Test & Demo",
        tasks: [
          "Test with synthetic anomaly scenarios",
          "Measure explanation accuracy (target: 85%)",
          "Live demo walkthrough for judges",
        ],
        color: ACCENT,
      },
    ];

    for (let i = 0; i < 4; i++) {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y: 1.15,
        w: 2.22,
        h: 4.1,
        fill: { color: WHITE },
        rectRadius: 0.1,
        shadow: {
          type: "outer",
          color: "000000",
          blur: 6,
          offset: 2,
          angle: 45,
          opacity: 0.09,
        },
        line: { color: "E2E8F0", width: 1 },
      });

      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.1,
        y: 1.22,
        w: 2.02,
        h: 0.4,
        fill: { color: phases[i].color },
        rectRadius: 0.06,
        line: { color: phases[i].color },
      });
      s.addText(phases[i].phase, {
        x: x + 0.1,
        y: 1.22,
        w: 2.02,
        h: 0.4,
        fontSize: 12,
        color: WHITE,
        bold: true,
        align: "center",
        valign: "middle",
        margin: 0,
      });

      s.addText(phases[i].title, {
        x: x + 0.12,
        y: 1.7,
        w: 1.98,
        h: 0.6,
        fontSize: 12.5,
        color: NAVY,
        bold: true,
        align: "center",
      });

      s.addText(
        phases[i].tasks.map((t, idx) => ({
          text: t,
          options: {
            bullet: true,
            breakLine: idx < phases[i].tasks.length - 1,
            paraSpaceAfter: 5,
          },
        })),
        { x: x + 0.12, y: 2.45, w: 1.98, h: 2.55, fontSize: 11, color: GRAY },
      );
    }
  }

  // ─── SLIDE 10: Closing ───────────────────────────────────────────────────────
  {
    let s = pres.addSlide();
    s.background = { color: NAVY };

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.08,
      fill: { color: TEAL },
      line: { color: TEAL },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0,
      y: 5.545,
      w: 10,
      h: 0.08,
      fill: { color: TEAL },
      line: { color: TEAL },
    });

    const bulbIcon = await iconToBase64Png(FaLightbulb, "#F59E0B", 256);
    s.addImage({ data: bulbIcon, x: 4.55, y: 0.55, w: 0.9, h: 0.9 });

    s.addText('From "Something Broke"', {
      x: 0.5,
      y: 1.55,
      w: 9,
      h: 0.75,
      fontSize: 34,
      color: WHITE,
      bold: true,
      align: "center",
    });
    s.addText('to "Here\'s Why — and How to Fix It"', {
      x: 0.5,
      y: 2.25,
      w: 9,
      h: 0.75,
      fontSize: 28,
      color: TEAL,
      bold: true,
      align: "center",
    });

    s.addText(
      "We're using Claude AI to turn raw anomaly data into actionable explanations —\nso engineers spend less time guessing and more time solving.",
      {
        x: 1.0,
        y: 3.15,
        w: 8,
        h: 0.9,
        fontSize: 15,
        color: "A0B4C8",
        align: "center",
        italic: true,
      },
    );

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 3.2,
      y: 4.3,
      w: 3.6,
      h: 0.7,
      fill: { color: TEAL },
      rectRadius: 0.1,
      line: { color: TEAL },
    });
    s.addText("Thank You!", {
      x: 3.2,
      y: 4.3,
      w: 3.6,
      h: 0.7,
      fontSize: 20,
      color: WHITE,
      bold: true,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  }

  await pres.writeFile({ fileName: "AI_Friday_S2_Anomaly_Tool.pptx" });
  console.log("Done!");
}

makePPT().catch(console.error);
