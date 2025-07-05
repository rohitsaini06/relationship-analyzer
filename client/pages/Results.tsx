import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  Shield,
  Brain,
  Zap,
} from "lucide-react";

export default function Results() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have analysis data from navigation state
    if (location.state?.analysisData && location.state?.fileNames) {
      setAnalysisData(location.state.analysisData);
      setFileNames(location.state.fileNames);
      setIsLoading(false);
    } else {
      // If no data, redirect back to homepage
      navigate("/");
    }
  }, [location.state, navigate]);

  // Extract analysis data from the new structure
  const analysis = analysisData?.data?.analysis;

  // Extract participant names dynamically from analysis or use default
  const getParticipants = () => {
    // Try to get from EmotionalLandscape first (most reliable)
    if (analysis?.EmotionalLandscape) {
      const names = Object.keys(analysis.EmotionalLandscape);
      if (names.length >= 2) {
        return names.slice(0, 2);
      }
    }

    // Try to get from ResponseSpeed patterns
    if (analysis?.CommunicationPatterns?.ResponseSpeed) {
      const responseData = analysis.CommunicationPatterns.ResponseSpeed;
      const names = Object.keys(responseData).filter(
        (key) => key !== "overall",
      );
      if (names.length >= 2) {
        // Capitalize first letter of each name
        return names.map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1),
        );
      }
    }

    // Try to get from Initiation patterns
    if (analysis?.CommunicationPatterns?.Initiation) {
      const names = Object.keys(analysis.CommunicationPatterns.Initiation);
      if (names.length >= 2) {
        // Capitalize first letter of each name
        return names.map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1),
        );
      }
    }

    // Try to get from ConversationalPower
    if (analysis?.PowerDynamicsAndControl?.ConversationalPower) {
      const names = Object.keys(
        analysis.PowerDynamicsAndControl.ConversationalPower,
      );
      if (names.length >= 2) {
        // Capitalize first letter of each name
        return names.map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1),
        );
      }
    }

    // Fallback to default
    return ["Person A", "Person B"];
  };

  const participants = getParticipants();

  const downloadReport = () => {
    // Create a clean HTML version of the report
    const reportContent = generateReportHTML();

    // Create and download the HTML file
    const blob = new Blob([reportContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relationship-analysis-${participants.join("-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Create a clean HTML version optimized for PDF
    const reportContent = generatePDFReportHTML();

    // Open in new window and trigger print dialog
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(reportContent);
      printWindow.document.close();

      // Wait for content to load then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close window after print dialog
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        }, 250);
      };
    }
  };

  const generateReportHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relationship Analysis Report - ${participants.join(" & ")}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
        }
        .header h1 {
            color: #1f2937;
            margin-bottom: 10px;
        }
        .metadata {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 14px;
            color: #6b7280;
            margin-top: 10px;
        }
        .section {
            margin-bottom: 40px;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6366f1;
            background: #f9fafb;
        }
        .section-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #1f2937;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .subsection {
            margin-bottom: 24px;
        }
        .subsection-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #374151;
        }
        .subsection-content {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.6;
        }
        .details-list {
            list-style: none;
            padding-left: 0;
        }
        .details-list li {
            margin-bottom: 8px;
            padding-left: 16px;
            position: relative;
        }
        .details-list li:before {
            content: "•";
            color: #6366f1;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        .timeline-item {
            margin-bottom: 12px;
            padding: 12px;
            background: #fff;
            border-radius: 6px;
            border-left: 3px solid #10b981;
        }
        .participant-section {
            background: #1f2937;
            color: #fff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .participant-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .participant-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
        }
        .participant-0-avatar {
            background: #9333ea;
        }
        .participant-1-avatar {
            background: #2563eb;
        }
        .key-indicators {
            background: rgba(147, 51, 234, 0.1);
            padding: 12px;
            border-radius: 6px;
            margin-top: 12px;
        }
        .communication-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .communication-item {
            text-align: center;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .power-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .trust-section {
            background: #fef2f2;
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #ef4444;
            margin-top: 20px;
        }
        @media print {
            body { margin: 0; padding: 15px; }
            .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relationship Analysis Report</h1>
        <h2>${participants.join(" & ")}</h2>
        <div class="metadata">
            <span>📅 ${analysisData?.data?.metadata?.analyzedAt ? new Date(analysisData.data.metadata.analyzedAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
            <span>📁 ${fileNames.length} file(s) analyzed</span>
            <span>💕 Relationship Analysis</span>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">🔍 Relationship Status & History</h2>

        <div class="subsection">
            <h3 class="subsection-title">Relationship History</h3>
            <div class="subsection-content">
                <p><strong>${analysis?.RelationshipStatusAndHistory?.RelationshipHistory?.status || "Analysis of relationship history"}</strong></p>
                ${
                  analysis?.RelationshipStatusAndHistory?.RelationshipHistory
                    ?.details
                    ? `
                <ul class="details-list">
                    ${analysis.RelationshipStatusAndHistory.RelationshipHistory.details.map((detail: string) => `<li>${detail}</li>`).join("")}
                </ul>
                `
                    : ""
                }
            </div>
        </div>

        <div class="subsection">
            <h3 class="subsection-title">Current Status</h3>
            <div class="subsection-content">
                <p><strong>${analysis?.RelationshipStatusAndHistory?.CurrentStatus?.status || "Current relationship status"}</strong></p>
                ${
                  analysis?.RelationshipStatusAndHistory?.CurrentStatus?.details
                    ? `
                <ul class="details-list">
                    ${analysis.RelationshipStatusAndHistory.CurrentStatus.details.map((detail: string) => `<li>${detail}</li>`).join("")}
                </ul>
                `
                    : ""
                }
            </div>
        </div>

        ${
          analysis?.OnAgainOffAgainPattern
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Relationship Trajectory</h3>
            <div class="subsection-content">
                <p><strong>${analysis.OnAgainOffAgainPattern.RelationshipTrajectory?.pattern || "Relationship pattern analysis"}</strong></p>
                ${
                  analysis.OnAgainOffAgainPattern.RelationshipTrajectory
                    ?.timeline
                    ? `
                <div style="margin-top: 16px;">
                    ${analysis.OnAgainOffAgainPattern.RelationshipTrajectory.timeline
                      .map(
                        (item: any) => `
                    <div class="timeline-item">
                        <strong>${item.date || "Event"}</strong>: ${item.event || "Timeline event"}
                    </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    <div class="section">
        <h2 class="section-title">💬 Communication Patterns</h2>

        <div class="communication-grid">
            <div class="communication-item">
                <h3>📊 Frequency</h3>
                <p>${analysis?.CommunicationPatterns?.Frequency || "Message frequency analysis"}</p>
            </div>
            <div class="communication-item">
                <h3>⚡ Response Speed</h3>
                <p>${analysis?.CommunicationPatterns?.ResponseSpeed?.overall || "Response time patterns"}</p>
                <div style="font-size: 12px; margin-top: 8px;">
                    <div>${participants[0]}: ${analysis?.CommunicationPatterns?.ResponseSpeed?.[participants[0].toLowerCase()] || "N/A"}</div>
                    <div>${participants[1]}: ${analysis?.CommunicationPatterns?.ResponseSpeed?.[participants[1].toLowerCase()] || "N/A"}</div>
                </div>
            </div>
            <div class="communication-item">
                <h3>🎯 Initiation</h3>
                <div style="font-size: 12px;">
                    <div>${participants[0]}: ${analysis?.CommunicationPatterns?.Initiation?.[participants[0].toLowerCase()] || "N/A"}</div>
                    <div>${participants[1]}: ${analysis?.CommunicationPatterns?.Initiation?.[participants[1].toLowerCase()] || "N/A"}</div>
                </div>
            </div>
        </div>

        ${
          analysis?.CommunicationPatterns?.LanguageStyle
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Language Style</h3>
            <div class="subsection-content">
                <p><strong>Informality:</strong> ${analysis.CommunicationPatterns.LanguageStyle.informality}</p>
                <p><strong>Code Switching:</strong> ${analysis.CommunicationPatterns.LanguageStyle.codeSwitching ? "Yes" : "No"}</p>
                <p><strong>Emoji Usage:</strong> ${analysis.CommunicationPatterns.LanguageStyle.emojiUsage}</p>
                ${
                  analysis.CommunicationPatterns.LanguageStyle.internetSlang &&
                  analysis.CommunicationPatterns.LanguageStyle.internetSlang
                    .length > 0
                    ? `
                <p><strong>Internet Slang:</strong> ${analysis.CommunicationPatterns.LanguageStyle.internetSlang.join(", ")}</p>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    ${
      analysis?.ProblemSolvingStyle
        ? `
    <div class="section">
        <h2 class="section-title">🔧 Problem Solving Style</h2>
        <div class="subsection-content">
            <p>${analysis.ProblemSolvingStyle.pattern}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
                <div>
                    <h3 style="color: #9333ea;">${participants[0]}'s Approach</h3>
                    <p>${analysis.ProblemSolvingStyle[participants[0].toLowerCase()]}</p>
                </div>
                <div>
                    <h3 style="color: #2563eb;">${participants[1]}'s Approach</h3>
                    <p>${analysis.ProblemSolvingStyle[participants[1].toLowerCase()]}</p>
                </div>
            </div>
        </div>
    </div>
    `
        : ""
    }

    <div class="section">
        <h2 class="section-title">💕 Emotional Landscape</h2>

        <div class="participant-section">
            <div class="participant-header">
                <div class="participant-avatar participant-0-avatar">${participants[0].charAt(0).toUpperCase()}</div>
                <h3>${participants[0]}'s Emotional State</h3>
            </div>
            <p>${analysis?.EmotionalLandscape?.[participants[0]]?.state || "Emotional state analysis"}</p>
            ${
              analysis?.EmotionalLandscape?.[participants[0]]?.keyIndicators &&
              analysis.EmotionalLandscape[participants[0]].keyIndicators
                .length > 0
                ? `
            <div class="key-indicators">
                <h4>Key Emotional Indicators</h4>
                <ul class="details-list">
                    ${analysis.EmotionalLandscape[participants[0]].keyIndicators.map((indicator: string) => `<li>${indicator}</li>`).join("")}
                </ul>
            </div>
            `
                : ""
            }
        </div>

        <div class="participant-section">
            <div class="participant-header">
                <div class="participant-avatar participant-1-avatar">${participants[1].charAt(0).toUpperCase()}</div>
                <h3>${participants[1]}'s Emotional State</h3>
            </div>
            <p>${analysis?.EmotionalLandscape?.[participants[1]]?.state || "Emotional state analysis"}</p>
            ${
              analysis?.EmotionalLandscape?.[participants[1]]?.keyIndicators &&
              analysis.EmotionalLandscape[participants[1]].keyIndicators
                .length > 0
                ? `
            <div class="key-indicators">
                <h4>Key Emotional Indicators</h4>
                <ul class="details-list">
                    ${analysis.EmotionalLandscape[participants[1]].keyIndicators.map((indicator: string) => `<li>${indicator}</li>`).join("")}
                </ul>
            </div>
            `
                : ""
            }
        </div>

        ${
          analysis?.UnderlyingConnection
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Underlying Connection</h3>
            <div class="subsection-content">
                <p>${analysis.UnderlyingConnection.EmotionalInvestment}</p>
                ${
                  analysis.UnderlyingConnection.CaringGestures &&
                  analysis.UnderlyingConnection.CaringGestures.length > 0
                    ? `
                <div style="margin-top: 16px;">
                    <h4>Caring Gestures:</h4>
                    <ul class="details-list">
                        ${analysis.UnderlyingConnection.CaringGestures.map((gesture: string) => `<li>${gesture}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
                ${
                  analysis.UnderlyingConnection.ProtectiveInstincts &&
                  analysis.UnderlyingConnection.ProtectiveInstincts.length > 0
                    ? `
                <div style="margin-top: 16px;">
                    <h4>Protective Instincts:</h4>
                    <ul class="details-list">
                        ${analysis.UnderlyingConnection.ProtectiveInstincts.map((instinct: string) => `<li>${instinct}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    <div class="section">
        <h2 class="section-title">⚖️ Power Dynamics & Control</h2>

        <div class="power-grid">
            ${
              analysis?.PowerDynamicsAndControl?.ConversationalPower
                ? `
            <div class="subsection">
                <h3 class="subsection-title">Conversational Power</h3>
                <div class="subsection-content">
                    <p><strong>${participants[0]}:</strong> ${analysis.PowerDynamicsAndControl.ConversationalPower[participants[0].toLowerCase()]}</p>
                    <p><strong>${participants[1]}:</strong> ${analysis.PowerDynamicsAndControl.ConversationalPower[participants[1].toLowerCase()]}</p>
                </div>
            </div>
            `
                : ""
            }

            ${
              analysis?.PowerDynamicsAndControl?.RespectLevels
                ? `
            <div class="subsection">
                <h3 class="subsection-title">Respect Levels</h3>
                <div class="subsection-content">
                    <p><strong>During Conflicts:</strong> ${analysis.PowerDynamicsAndControl.RespectLevels.duringConflicts}</p>
                    <p><strong>Baseline Interactions:</strong> ${analysis.PowerDynamicsAndControl.RespectLevels.baselineInteractions}</p>
                </div>
            </div>
            `
                : ""
            }
        </div>

        ${
          analysis?.TrustDynamics
            ? `
        <div class="trust-section">
            <h3 class="subsection-title">Trust Dynamics</h3>
            <div class="subsection-content">
                <p>${analysis.TrustDynamics.TrustErosion}</p>
                ${
                  analysis.TrustDynamics.Vulnerability &&
                  analysis.TrustDynamics.Vulnerability.length > 0
                    ? `
                <div style="margin-top: 12px;">
                    <h4>Vulnerability Patterns:</h4>
                    <ul class="details-list">
                        ${analysis.TrustDynamics.Vulnerability.map((item: string) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    ${
      analysis?.rawAnalysis
        ? `
    <div class="section">
        <h2 class="section-title">📝 Detailed Analysis</h2>
        <div class="subsection-content">
            <pre style="white-space: pre-wrap; font-family: monospace; background: #f3f4f6; padding: 16px; border-radius: 6px; font-size: 12px;">${analysis.rawAnalysis}</pre>
        </div>
    </div>
    `
        : ""
    }

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
        <p>Generated by Relationship Analyzer • ${new Date().toLocaleDateString()} • Confidential Report</p>
    </div>
</body>
</html>
    `.trim();
  };

  const generatePDFReportHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relationship Analysis Report - ${participants.join(" & ")}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #1f2937;
            padding: 20px;
            background: #fff;
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
        }

        .header h1 {
            color: #1f2937;
            margin-bottom: 8px;
            font-size: 24px;
        }

        .header h2 {
            color: #6366f1;
            margin-bottom: 10px;
            font-size: 18px;
        }

        .metadata {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            font-size: 11px;
            color: #6b7280;
        }

        .section {
            margin-bottom: 25px;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #6366f1;
            background: #f9fafb;
            break-inside: avoid;
        }

        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #1f2937;
        }

        .subsection {
            margin-bottom: 15px;
        }

        .subsection-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #374151;
        }

        .subsection-content {
            font-size: 11px;
            color: #4b5563;
            line-height: 1.4;
        }

        .details-list {
            list-style: none;
            padding-left: 0;
            margin-top: 8px;
        }

        .details-list li {
            margin-bottom: 4px;
            padding-left: 12px;
            position: relative;
            font-size: 10px;
        }

        .details-list li:before {
            content: "��";
            color: #6366f1;
            font-weight: bold;
            position: absolute;
            left: 0;
        }

        .timeline-item {
            margin-bottom: 8px;
            padding: 8px;
            background: #fff;
            border-radius: 4px;
            border-left: 2px solid #10b981;
            font-size: 10px;
        }

        .participant-section {
            background: #374151;
            color: #fff;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            break-inside: avoid;
        }

        .participant-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
        }

        .participant-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
            font-size: 12px;
        }

        .participant-0-avatar {
            background: #9333ea;
        }

        .participant-1-avatar {
            background: #2563eb;
        }

        .key-indicators {
            background: rgba(147, 51, 234, 0.15);
            padding: 8px;
            border-radius: 4px;
            margin-top: 8px;
        }

        .communication-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 15px;
        }

        .communication-item {
            text-align: center;
            padding: 12px;
            background: #fff;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .communication-item h3 {
            font-size: 12px;
            margin-bottom: 6px;
        }

        .communication-item p {
            font-size: 10px;
        }

        .power-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .trust-section {
            background: #fef2f2;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #ef4444;
            margin-top: 15px;
        }

        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        @page {
            margin: 1cm;
            size: A4;
        }

        @media print {
            body {
                margin: 0;
                padding: 10px;
                font-size: 11px;
            }

            .section {
                break-inside: avoid;
                margin-bottom: 15px;
                padding: 10px;
            }

            .participant-section {
                break-inside: avoid;
            }

            .header {
                margin-bottom: 20px;
            }

            .communication-grid {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relationship Analysis Report</h1>
        <h2>${participants.join(" & ")}</h2>
        <div class="metadata">
            <span>📅 ${analysisData?.data?.metadata?.analyzedAt ? new Date(analysisData.data.metadata.analyzedAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
            <span>📁 ${fileNames.length} file(s) analyzed</span>
            <span>💕 Relationship Analysis</span>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">🔍 Relationship Status & History</h2>

        <div class="two-column">
            <div class="subsection">
                <h3 class="subsection-title">Relationship History</h3>
                <div class="subsection-content">
                    <p><strong>${analysis?.RelationshipStatusAndHistory?.RelationshipHistory?.status || "Analysis of relationship history"}</strong></p>
                    ${
                      analysis?.RelationshipStatusAndHistory
                        ?.RelationshipHistory?.details
                        ? `
                    <ul class="details-list">
                        ${analysis.RelationshipStatusAndHistory.RelationshipHistory.details.map((detail: string) => `<li>${detail}</li>`).join("")}
                    </ul>
                    `
                        : ""
                    }
                </div>
            </div>

            <div class="subsection">
                <h3 class="subsection-title">Current Status</h3>
                <div class="subsection-content">
                    <p><strong>${analysis?.RelationshipStatusAndHistory?.CurrentStatus?.status || "Current relationship status"}</strong></p>
                    ${
                      analysis?.RelationshipStatusAndHistory?.CurrentStatus
                        ?.details
                        ? `
                    <ul class="details-list">
                        ${analysis.RelationshipStatusAndHistory.CurrentStatus.details.map((detail: string) => `<li>${detail}</li>`).join("")}
                    </ul>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>

        ${
          analysis?.OnAgainOffAgainPattern
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Relationship Trajectory</h3>
            <div class="subsection-content">
                <p><strong>${analysis.OnAgainOffAgainPattern.RelationshipTrajectory?.pattern || "Relationship pattern analysis"}</strong></p>
                ${
                  analysis.OnAgainOffAgainPattern.RelationshipTrajectory
                    ?.timeline
                    ? `
                <div style="margin-top: 12px;">
                    ${analysis.OnAgainOffAgainPattern.RelationshipTrajectory.timeline
                      .map(
                        (item: any) => `
                    <div class="timeline-item">
                        <strong>${item.date || "Event"}</strong>: ${item.event || "Timeline event"}
                    </div>
                    `,
                      )
                      .join("")}
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    <div class="section">
        <h2 class="section-title">💬 Communication Patterns</h2>

        <div class="communication-grid">
            <div class="communication-item">
                <h3>📊 Frequency</h3>
                <p>${analysis?.CommunicationPatterns?.Frequency || "Message frequency analysis"}</p>
            </div>
            <div class="communication-item">
                <h3>⚡ Response Speed</h3>
                <p>${analysis?.CommunicationPatterns?.ResponseSpeed?.overall || "Response time patterns"}</p>
                <div style="font-size: 9px; margin-top: 4px;">
                    <div>${participants[0]}: ${analysis?.CommunicationPatterns?.ResponseSpeed?.[participants[0].toLowerCase()] || "N/A"}</div>
                    <div>${participants[1]}: ${analysis?.CommunicationPatterns?.ResponseSpeed?.[participants[1].toLowerCase()] || "N/A"}</div>
                </div>
            </div>
            <div class="communication-item">
                <h3>🎯 Initiation</h3>
                <div style="font-size: 9px;">
                    <div>${participants[0]}: ${analysis?.CommunicationPatterns?.Initiation?.[participants[0].toLowerCase()] || "N/A"}</div>
                    <div>${participants[1]}: ${analysis?.CommunicationPatterns?.Initiation?.[participants[1].toLowerCase()] || "N/A"}</div>
                </div>
            </div>
        </div>

        ${
          analysis?.CommunicationPatterns?.LanguageStyle
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Language Style</h3>
            <div class="subsection-content">
                <p><strong>Informality:</strong> ${analysis.CommunicationPatterns.LanguageStyle.informality}</p>
                <p><strong>Code Switching:</strong> ${analysis.CommunicationPatterns.LanguageStyle.codeSwitching ? "Yes" : "No"}</p>
                <p><strong>Emoji Usage:</strong> ${analysis.CommunicationPatterns.LanguageStyle.emojiUsage}</p>
                ${
                  analysis.CommunicationPatterns.LanguageStyle.internetSlang &&
                  analysis.CommunicationPatterns.LanguageStyle.internetSlang
                    .length > 0
                    ? `
                <p><strong>Internet Slang:</strong> ${analysis.CommunicationPatterns.LanguageStyle.internetSlang.join(", ")}</p>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    ${
      analysis?.ProblemSolvingStyle
        ? `
    <div class="section">
        <h2 class="section-title">🔧 Problem Solving Style</h2>
        <div class="subsection-content">
            <p>${analysis.ProblemSolvingStyle.pattern}</p>
            <div class="two-column" style="margin-top: 12px;">
                <div>
                    <h3 style="color: #9333ea; font-size: 12px;">${participants[0]}'s Approach</h3>
                    <p>${analysis.ProblemSolvingStyle[participants[0].toLowerCase()]}</p>
                </div>
                <div>
                    <h3 style="color: #2563eb; font-size: 12px;">${participants[1]}'s Approach</h3>
                    <p>${analysis.ProblemSolvingStyle[participants[1].toLowerCase()]}</p>
                </div>
            </div>
        </div>
    </div>
    `
        : ""
    }

    <div class="section">
        <h2 class="section-title">💕 Emotional Landscape</h2>

        <div class="participant-section">
            <div class="participant-header">
                <div class="participant-avatar participant-0-avatar">${participants[0].charAt(0).toUpperCase()}</div>
                <h3>${participants[0]}'s Emotional State</h3>
            </div>
            <p style="font-size: 11px;">${analysis?.EmotionalLandscape?.[participants[0]]?.state || "Emotional state analysis"}</p>
            ${
              analysis?.EmotionalLandscape?.[participants[0]]?.keyIndicators &&
              analysis.EmotionalLandscape[participants[0]].keyIndicators
                .length > 0
                ? `
            <div class="key-indicators">
                <h4 style="font-size: 11px; margin-bottom: 6px;">Key Emotional Indicators</h4>
                <ul class="details-list">
                    ${analysis.EmotionalLandscape[participants[0]].keyIndicators.map((indicator: string) => `<li>${indicator}</li>`).join("")}
                </ul>
            </div>
            `
                : ""
            }
        </div>

        <div class="participant-section">
            <div class="participant-header">
                <div class="participant-avatar participant-1-avatar">${participants[1].charAt(0).toUpperCase()}</div>
                <h3>${participants[1]}'s Emotional State</h3>
            </div>
            <p style="font-size: 11px;">${analysis?.EmotionalLandscape?.[participants[1]]?.state || "Emotional state analysis"}</p>
            ${
              analysis?.EmotionalLandscape?.[participants[1]]?.keyIndicators &&
              analysis.EmotionalLandscape[participants[1]].keyIndicators
                .length > 0
                ? `
            <div class="key-indicators">
                <h4 style="font-size: 11px; margin-bottom: 6px;">Key Emotional Indicators</h4>
                <ul class="details-list">
                    ${analysis.EmotionalLandscape[participants[1]].keyIndicators.map((indicator: string) => `<li>${indicator}</li>`).join("")}
                </ul>
            </div>
            `
                : ""
            }
        </div>

        ${
          analysis?.UnderlyingConnection
            ? `
        <div class="subsection">
            <h3 class="subsection-title">Underlying Connection</h3>
            <div class="subsection-content">
                <p>${analysis.UnderlyingConnection.EmotionalInvestment}</p>
                <div class="two-column" style="margin-top: 12px;">
                    ${
                      analysis.UnderlyingConnection.CaringGestures &&
                      analysis.UnderlyingConnection.CaringGestures.length > 0
                        ? `
                    <div>
                        <h4 style="font-size: 11px;">Caring Gestures:</h4>
                        <ul class="details-list">
                            ${analysis.UnderlyingConnection.CaringGestures.map((gesture: string) => `<li>${gesture}</li>`).join("")}
                        </ul>
                    </div>
                    `
                        : ""
                    }
                    ${
                      analysis.UnderlyingConnection.ProtectiveInstincts &&
                      analysis.UnderlyingConnection.ProtectiveInstincts.length >
                        0
                        ? `
                    <div>
                        <h4 style="font-size: 11px;">Protective Instincts:</h4>
                        <ul class="details-list">
                            ${analysis.UnderlyingConnection.ProtectiveInstincts.map((instinct: string) => `<li>${instinct}</li>`).join("")}
                        </ul>
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
        `
            : ""
        }
    </div>

    <div class="section">
        <h2 class="section-title">⚖️ Power Dynamics & Control</h2>

        <div class="power-grid">
            ${
              analysis?.PowerDynamicsAndControl?.ConversationalPower
                ? `
            <div class="subsection">
                <h3 class="subsection-title">Conversational Power</h3>
                <div class="subsection-content">
                    <p><strong>${participants[0]}:</strong> ${analysis.PowerDynamicsAndControl.ConversationalPower[participants[0].toLowerCase()]}</p>
                    <p><strong>${participants[1]}:</strong> ${analysis.PowerDynamicsAndControl.ConversationalPower[participants[1].toLowerCase()]}</p>
                </div>
            </div>
            `
                : ""
            }

            ${
              analysis?.PowerDynamicsAndControl?.RespectLevels
                ? `
            <div class="subsection">
                <h3 class="subsection-title">Respect Levels</h3>
                <div class="subsection-content">
                    <p><strong>During Conflicts:</strong> ${analysis.PowerDynamicsAndControl.RespectLevels.duringConflicts}</p>
                    <p><strong>Baseline Interactions:</strong> ${analysis.PowerDynamicsAndControl.RespectLevels.baselineInteractions}</p>
                </div>
            </div>
            `
                : ""
            }
        </div>

        ${
          analysis?.TrustDynamics
            ? `
        <div class="trust-section">
            <h3 class="subsection-title">Trust Dynamics</h3>
            <div class="subsection-content">
                <p>${analysis.TrustDynamics.TrustErosion}</p>
                ${
                  analysis.TrustDynamics.Vulnerability &&
                  analysis.TrustDynamics.Vulnerability.length > 0
                    ? `
                <div style="margin-top: 8px;">
                    <h4 style="font-size: 11px;">Vulnerability Patterns:</h4>
                    <ul class="details-list">
                        ${analysis.TrustDynamics.Vulnerability.map((item: string) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
                `
                    : ""
                }
            </div>
        </div>
        `
            : ""
        }
    </div>

    ${
      analysis?.rawAnalysis
        ? `
    <div class="section">
        <h2 class="section-title">📝 Detailed Analysis</h2>
        <div class="subsection-content">
            <pre style="white-space: pre-wrap; font-family: monospace; background: #f3f4f6; padding: 12px; border-radius: 4px; font-size: 9px; line-height: 1.3;">${analysis.rawAnalysis}</pre>
        </div>
    </div>
    `
        : ""
    }

    <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 10px;">
        <p>Generated by Relationship Analyzer • ${new Date().toLocaleDateString()} • Confidential Report</p>
    </div>
</body>
</html>
    `.trim();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Site Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Relationship Analyzer
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
            <span className="mx-2">•</span>
            <Brain className="w-4 h-4" />
            <span>Deep Analysis</span>
            <span className="mx-2">•</span>
            <Zap className="w-4 h-4" />
            <span>Revealing Insights</span>
          </div>
        </div>
      </header>

      {/* Analysis Header */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  Analysis Complete: {participants.join(" & ")}
                </h1>
                <p className="text-gray-300 mt-1">
                  A comprehensive analysis of relationship dynamics and
                  communication patterns
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-900"
                onClick={exportToPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {analysisData?.data?.metadata?.analyzedAt
                  ? new Date(
                      analysisData.data.metadata.analyzedAt,
                    ).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{fileNames.length} file(s) analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Relationship Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Relationship Status & History */}
        <section className="mb-12">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                <CardTitle className="text-xl">
                  Relationship Status & History
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Relationship History */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Relationship History
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {analysis?.RelationshipStatusAndHistory
                        ?.RelationshipHistory?.status ||
                        "Analysis of relationship history"}
                    </p>
                    {analysis?.RelationshipStatusAndHistory?.RelationshipHistory
                      ?.details && (
                      <ul className="space-y-2 ml-4">
                        {analysis.RelationshipStatusAndHistory.RelationshipHistory.details.map(
                          (detail: string, index: number) => (
                            <li key={index}>• {detail}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    Current Status
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {analysis?.RelationshipStatusAndHistory?.CurrentStatus
                        ?.status || "Current relationship status"}
                    </p>
                    {analysis?.RelationshipStatusAndHistory?.CurrentStatus
                      ?.details && (
                      <ul className="space-y-2 ml-4">
                        {analysis.RelationshipStatusAndHistory.CurrentStatus.details.map(
                          (detail: string, index: number) => (
                            <li key={index}>• {detail}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Relationship Trajectory */}
              {analysis?.OnAgainOffAgainPattern && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Relationship Trajectory
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">
                        Pattern Analysis
                      </h4>
                      <Badge variant="destructive">Timeline Events</Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-6">
                      {analysis.OnAgainOffAgainPattern.RelationshipTrajectory
                        ?.pattern || "Relationship pattern analysis"}
                    </p>

                    {analysis.OnAgainOffAgainPattern.RelationshipTrajectory
                      ?.timeline && (
                      <div className="space-y-4">
                        {analysis.OnAgainOffAgainPattern.RelationshipTrajectory.timeline.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
                              <div className="w-24 text-gray-400 text-sm">
                                {item.date || `Event ${index + 1}`}
                              </div>
                              <div className="text-gray-300 text-sm">
                                {item.event || "Timeline event"}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Communication Patterns */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-xl">
                  Communication Patterns
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Frequency */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Frequency</h3>
                  <p className="text-sm text-gray-600">
                    {analysis?.CommunicationPatterns?.Frequency ||
                      "Message frequency analysis"}
                  </p>
                </div>

                {/* Response Speed */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Response Speed</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {analysis?.CommunicationPatterns?.ResponseSpeed?.overall ||
                      "Response time patterns"}
                  </p>
                  <div className="text-xs text-gray-500">
                    <div>
                      {participants[0]}:{" "}
                      {analysis?.CommunicationPatterns?.ResponseSpeed?.[
                        participants[0].toLowerCase()
                      ] || "N/A"}
                    </div>
                    <div>
                      {participants[1]}:{" "}
                      {analysis?.CommunicationPatterns?.ResponseSpeed?.[
                        participants[1].toLowerCase()
                      ] || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Initiation */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Initiation</h3>
                  <div className="text-xs text-gray-500">
                    <div>
                      {participants[0]}:{" "}
                      {analysis?.CommunicationPatterns?.Initiation?.[
                        participants[0].toLowerCase()
                      ] || "N/A"}
                    </div>
                    <div>
                      {participants[1]}:{" "}
                      {analysis?.CommunicationPatterns?.Initiation?.[
                        participants[1].toLowerCase()
                      ] || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Style */}
              {analysis?.CommunicationPatterns?.LanguageStyle && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Language Style</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Informality:</strong>{" "}
                        {
                          analysis.CommunicationPatterns.LanguageStyle
                            .informality
                        }
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Code Switching:</strong>{" "}
                        {analysis.CommunicationPatterns.LanguageStyle
                          .codeSwitching
                          ? "Yes"
                          : "No"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Emoji Usage:</strong>{" "}
                        {
                          analysis.CommunicationPatterns.LanguageStyle
                            .emojiUsage
                        }
                      </p>
                    </div>
                    <div>
                      {analysis.CommunicationPatterns.LanguageStyle
                        .internetSlang &&
                        analysis.CommunicationPatterns.LanguageStyle
                          .internetSlang.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">
                              Internet Slang:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.CommunicationPatterns.LanguageStyle.internetSlang.map(
                                (slang: string, index: number) => (
                                  <Badge key={index} variant="secondary">
                                    {slang}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Problem Solving Style */}
        {analysis?.ProblemSolvingStyle && (
          <section className="mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <CardTitle className="text-xl">
                    Problem Solving Style
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {analysis.ProblemSolvingStyle.pattern}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-purple-600">
                      {participants[0]}'s Approach
                    </h3>
                    <p className="text-sm text-gray-600">
                      {
                        analysis.ProblemSolvingStyle[
                          participants[0].toLowerCase()
                        ]
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-blue-600">
                      {participants[1]}'s Approach
                    </h3>
                    <p className="text-sm text-gray-600">
                      {
                        analysis.ProblemSolvingStyle[
                          participants[1].toLowerCase()
                        ]
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Emotional Landscape */}
        <section className="mb-12">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-400" />
                <CardTitle className="text-xl">Emotional Landscape</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* First Participant's Emotional State */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {participants[0].charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {participants[0]}'s Emotional State
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {analysis?.EmotionalLandscape?.[participants[0]]?.state ||
                        "Emotional state analysis"}
                    </p>
                    {analysis?.EmotionalLandscape?.[participants[0]]
                      ?.keyIndicators &&
                      analysis.EmotionalLandscape[participants[0]].keyIndicators
                        .length > 0 && (
                        <div className="bg-purple-900/30 p-3 rounded-lg">
                          <h4 className="font-semibold text-purple-300 mb-2">
                            Key Emotional Indicators
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {analysis.EmotionalLandscape[
                              participants[0]
                            ].keyIndicators.map(
                              (indicator: string, index: number) => (
                                <li key={index}>• {indicator}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>

                {/* Second Participant's Emotional State */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {participants[1].charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-xl font-semibold">
                      {participants[1]}'s Emotional State
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {analysis?.EmotionalLandscape?.[participants[1]]?.state ||
                        "Emotional state analysis"}
                    </p>
                    {analysis?.EmotionalLandscape?.[participants[1]]
                      ?.keyIndicators &&
                      analysis.EmotionalLandscape[participants[1]].keyIndicators
                        .length > 0 && (
                        <div className="bg-blue-900/30 p-3 rounded-lg">
                          <h4 className="font-semibold text-blue-300 mb-2">
                            Key Emotional Indicators
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {analysis.EmotionalLandscape[
                              participants[1]
                            ].keyIndicators.map(
                              (indicator: string, index: number) => (
                                <li key={index}>• {indicator}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Underlying Connection */}
              {analysis?.UnderlyingConnection && (
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    Underlying Connection
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {analysis.UnderlyingConnection.EmotionalInvestment}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {analysis.UnderlyingConnection.CaringGestures &&
                      analysis.UnderlyingConnection.CaringGestures.length >
                        0 && (
                        <div>
                          <h4 className="font-semibold text-green-300 mb-2">
                            Caring Gestures:
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {analysis.UnderlyingConnection.CaringGestures.map(
                              (gesture: string, index: number) => (
                                <li key={index}>• {gesture}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    {analysis.UnderlyingConnection.ProtectiveInstincts &&
                      analysis.UnderlyingConnection.ProtectiveInstincts.length >
                        0 && (
                        <div>
                          <h4 className="font-semibold text-red-300 mb-2">
                            Protective Instincts:
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {analysis.UnderlyingConnection.ProtectiveInstincts.map(
                              (instinct: string, index: number) => (
                                <li key={index}>• {instinct}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Power Dynamics & Control */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-500" />
                <CardTitle className="text-xl">
                  Power Dynamics & Control
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Conversational Power */}
                {analysis?.PowerDynamicsAndControl?.ConversationalPower && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Conversational Power
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm text-purple-600 mb-1">
                          {participants[0]}:
                        </div>
                        <p className="text-sm text-gray-600">
                          {
                            analysis.PowerDynamicsAndControl
                              .ConversationalPower[
                              participants[0].toLowerCase()
                            ]
                          }
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-blue-600 mb-1">
                          {participants[1]}:
                        </div>
                        <p className="text-sm text-gray-600">
                          {
                            analysis.PowerDynamicsAndControl
                              .ConversationalPower[
                              participants[1].toLowerCase()
                            ]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Respect Levels */}
                {analysis?.PowerDynamicsAndControl?.RespectLevels && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Respect Levels
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm text-amber-600 mb-1">
                          During Conflicts:
                        </div>
                        <p className="text-sm text-gray-600">
                          {
                            analysis.PowerDynamicsAndControl.RespectLevels
                              .duringConflicts
                          }
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-green-600 mb-1">
                          Baseline Interactions:
                        </div>
                        <p className="text-sm text-gray-600">
                          {
                            analysis.PowerDynamicsAndControl.RespectLevels
                              .baselineInteractions
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Dynamics */}
              {analysis?.TrustDynamics && (
                <div className="mt-8 p-6 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Trust Dynamics
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {analysis.TrustDynamics.TrustErosion}
                  </p>
                  {analysis.TrustDynamics.Vulnerability &&
                    analysis.TrustDynamics.Vulnerability.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm text-red-700 mb-2">
                          Vulnerability Patterns:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysis.TrustDynamics.Vulnerability.map(
                            (item: string, index: number) => (
                              <li key={index}>• {item}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Raw Analysis Fallback */}
        {analysis?.rawAnalysis && (
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-500" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {analysis.rawAnalysis}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={downloadReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>
            Analyze Another Relationship
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">
                  Relationship Analyzer
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Revealing the hidden patterns in your digital relationships
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/how-it-works")}
                    className="hover:text-white transition-colors"
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/help-center")}
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/faq")}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 Relationship Analyzer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
