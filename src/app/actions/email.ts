"use server";

import nodemailer from "nodemailer";
import type { FormTrackingData } from "@/lib/tracking";

interface EmailFormData extends FormTrackingData {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    website?: unknown;
    services?: unknown;
    timeline?: unknown;
    source?: unknown;
    message?: unknown;
    formType?: unknown;
    genre?: unknown;
    pages?: unknown;
}

function toDisplayValue(value: unknown) {
    if (value === undefined || value === null || value === "") {
        return "N/A";
    }

    if (Array.isArray(value)) {
        return value.join(", ");
    }

    return String(value);
}

function escapeHtml(value: unknown) {
    return String(value ?? "N/A")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderRow(label: string, value: unknown) {
    if (value === undefined || value === null || value === "") {
        return "";
    }

    return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function hasPpcData(data: FormTrackingData) {
    return Boolean(
        data.utm_source ||
            data.utm_medium ||
            data.utm_campaign ||
            data.utm_term ||
            data.utm_content ||
            data.gclid ||
            data.fbclid ||
            data.msclkid ||
            data.landing_page ||
            data.previous_page ||
            data.current_page ||
            data.referrer
    );
}

export async function sendEmail(formData: EmailFormData) {
    try {
        const {
            name,
            email,
            phone,
            website,
            services,
            timeline,
            source,
            message,
            formType,
            genre,
            pages,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            gclid,
            fbclid,
            msclkid,
            landing_page,
            previous_page,
            current_page,
            referrer,
            user_agent,
        } = formData;

        const GMAIL_USER = process.env.GMAIL_USER;
        const GMAIL_PASS = process.env.GMAIL_PASS;
        const GMAIL_TO = (process.env.GMAIL_TO || GMAIL_USER || "")
            .split(",")
            .map((address) => address.trim())
            .filter(Boolean);

        if (!GMAIL_USER || !GMAIL_PASS) {
            throw new Error("Email service is not configured.");
        }

        const recipients = GMAIL_TO.length > 0 ? GMAIL_TO : [GMAIL_USER];

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        });

        const servicesValue = toDisplayValue(services);
        const trackingData: FormTrackingData = {
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            gclid,
            fbclid,
            msclkid,
            landing_page,
            previous_page,
            current_page,
            referrer,
            user_agent,
        };

        const ppcText = hasPpcData(trackingData)
            ? `
PPC / Marketing Attribution:
UTM Source: ${utm_source || "N/A"}
UTM Medium: ${utm_medium || "N/A"}
UTM Campaign: ${utm_campaign || "N/A"}
UTM Term: ${utm_term || "N/A"}
UTM Content: ${utm_content || "N/A"}
Google Click ID (gclid): ${gclid || "N/A"}
Facebook Click ID (fbclid): ${fbclid || "N/A"}
Microsoft Click ID (msclkid): ${msclkid || "N/A"}
Landing Page: ${landing_page || "N/A"}
Previous Page: ${previous_page || "N/A"}
Submitted From: ${current_page || "N/A"}
Referrer: ${referrer || "N/A"}
User Agent: ${user_agent || "N/A"}
`
            : "";

        const mailOptions = {
            from: `Aero Publishing <${GMAIL_USER}>`,
            to: recipients,
            replyTo: toDisplayValue(email) !== "N/A" ? String(email) : GMAIL_USER,
            subject: `New Lead: ${toDisplayValue(formType)}${utm_campaign ? ` | ${utm_campaign}` : ""}`,
            text: `
Form Details:
Form Type: ${toDisplayValue(formType)}
Name: ${toDisplayValue(name)}
Email: ${toDisplayValue(email)}
Phone: ${toDisplayValue(phone)}
Website: ${toDisplayValue(website)}
Genre: ${toDisplayValue(genre)}
Pages: ${toDisplayValue(pages)}
Services: ${servicesValue}
Timeline: ${toDisplayValue(timeline)}
Source: ${toDisplayValue(source)}
Message: ${toDisplayValue(message)}
${ppcText}
            `.trim(),
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #3F3774; border-bottom: 2px solid #FE695B; padding-bottom: 10px;">New Form Submission</h2>
        ${renderRow("Form Type", formType)}
        ${renderRow("Name", name)}
        ${renderRow("Email", email)}
        ${renderRow("Phone", phone)}
        ${renderRow("Genre", genre)}
        ${renderRow("Pages", pages)}
        ${renderRow("Website", website)}
        ${renderRow("Services", servicesValue)}
        ${renderRow("Timeline", timeline)}
        ${renderRow("Source", source)}
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(toDisplayValue(message))}</p>
        </div>
        ${
            hasPpcData(trackingData)
                ? `
        <div style="background: #f3f7ff; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #3F3774;">
            <h3 style="color: #3F3774; margin-top: 0;">PPC / Marketing Attribution</h3>
            ${renderRow("UTM Source", utm_source)}
            ${renderRow("UTM Medium", utm_medium)}
            ${renderRow("UTM Campaign", utm_campaign)}
            ${renderRow("UTM Term", utm_term)}
            ${renderRow("UTM Content", utm_content)}
            ${renderRow("Google Click ID (gclid)", gclid)}
            ${renderRow("Facebook Click ID (fbclid)", fbclid)}
            ${renderRow("Microsoft Click ID (msclkid)", msclkid)}
            ${renderRow("Landing Page", landing_page)}
            ${renderRow("Previous Page", previous_page)}
            ${renderRow("Submitted From", current_page)}
            ${renderRow("Referrer", referrer)}
            ${renderRow("User Agent", user_agent)}
        </div>`
                : ""
        }
        <footer style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
            <p>This email was sent from the Aero Publishing website contact form.</p>
        </footer>
      </div>
    `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error: unknown) {
        console.error("Error sending email:", error);
        const message = error instanceof Error ? error.message : "Failed to send email";
        return { success: false, message };
    }
}

const MAX_MANUSCRIPT_BYTES = 15 * 1024 * 1024;
const ALLOWED_MANUSCRIPT_EXTENSIONS = [".pdf", ".doc", ".docx", ".rtf", ".txt", ".odt"];

function field(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}

function getTransporter() {
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;
    const GMAIL_TO = (process.env.GMAIL_TO || GMAIL_USER || "")
        .split(",")
        .map((address) => address.trim())
        .filter(Boolean);

    if (!GMAIL_USER || !GMAIL_PASS) {
        throw new Error("Email service is not configured.");
    }

    const recipients = GMAIL_TO.length > 0 ? GMAIL_TO : [GMAIL_USER];

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS,
        },
    });

    return { transporter, GMAIL_USER, recipients };
}

function authorThankYouHtml(name: string, bookTitle: string) {
    const greetingName = escapeHtml(name || "Author");
    const title = escapeHtml(bookTitle || "your manuscript");

    return `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto; padding: 32px; border: 1px solid #eee; border-radius: 16px;">
        <h2 style="color: #3F3774; margin-top: 0;">Thank you for your submission</h2>
        <p style="color: #333; line-height: 1.7;">Dear ${greetingName},</p>
        <p style="color: #333; line-height: 1.7;">
          We have received your manuscript, <strong>${title}</strong>, and our publishing team will review it with care.
          A consultant will be in touch shortly to discuss next steps.
        </p>
        <p style="color: #333; line-height: 1.7;">
          If you have questions in the meantime, reply to this email or call
          <a href="tel:+14242823304" style="color: #FE695B; text-decoration: none;">+1 424 282 3304</a>.
        </p>
        <p style="color: #333; line-height: 1.7; margin-bottom: 0;">Warmly,<br/>The Aero Publishing Team</p>
        <footer style="margin-top: 28px; font-size: 12px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
          <p>Aero Publishing · admin@aeropublishing.com</p>
        </footer>
      </div>
    `;
}

export async function sendManuscriptSubmission(formData: FormData) {
    try {
        const fullName = field(formData, "fullName");
        const penName = field(formData, "penName");
        const email = field(formData, "email");
        const phone = field(formData, "phone");
        const street = field(formData, "street");
        const apartment = field(formData, "apartment");
        const city = field(formData, "city");
        const state = field(formData, "state");
        const postalCode = field(formData, "postalCode");
        const country = field(formData, "country");
        const bookTitle = field(formData, "bookTitle");
        const genre = field(formData, "genre");
        const wordCount = field(formData, "wordCount");
        const audience = field(formData, "audience");
        const synopsis = field(formData, "synopsis");
        const notes = field(formData, "notes");
        const utm_source = field(formData, "utm_source");
        const utm_medium = field(formData, "utm_medium");
        const utm_campaign = field(formData, "utm_campaign");
        const utm_term = field(formData, "utm_term");
        const utm_content = field(formData, "utm_content");
        const gclid = field(formData, "gclid");
        const fbclid = field(formData, "fbclid");
        const msclkid = field(formData, "msclkid");
        const landing_page = field(formData, "landing_page");
        const previous_page = field(formData, "previous_page");
        const current_page = field(formData, "current_page");
        const referrer = field(formData, "referrer");
        const user_agent = field(formData, "user_agent");

        const manuscript = formData.get("manuscript");

        if (!fullName || !email || !phone || !street || !city || !state || !postalCode || !country || !bookTitle || !genre || !wordCount || !synopsis) {
            return { success: false, message: "Please complete all required fields." };
        }

        const uploadedFile =
            manuscript instanceof File
                ? manuscript
                : manuscript &&
                    typeof manuscript === "object" &&
                    "arrayBuffer" in manuscript &&
                    "name" in manuscript &&
                    "size" in manuscript
                  ? (manuscript as File)
                  : null;

        if (!uploadedFile || uploadedFile.size === 0) {
            return { success: false, message: "Please attach your manuscript file." };
        }

        if (uploadedFile.size > MAX_MANUSCRIPT_BYTES) {
            return { success: false, message: "Manuscript must be 15MB or smaller." };
        }

        const extension = `.${uploadedFile.name.split(".").pop()?.toLowerCase() || ""}`;
        if (!ALLOWED_MANUSCRIPT_EXTENSIONS.includes(extension)) {
            return { success: false, message: "Please upload a PDF, DOC, DOCX, RTF, TXT, or ODT file." };
        }

        const { transporter, GMAIL_USER, recipients } = getTransporter();
        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
        const trackingData: FormTrackingData = {
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content,
            gclid,
            fbclid,
            msclkid,
            landing_page,
            previous_page,
            current_page,
            referrer,
            user_agent,
        };

        const addressLine = [street, apartment, city, state, postalCode, country]
            .filter(Boolean)
            .join(", ");

        await transporter.sendMail({
            from: `Aero Publishing <${GMAIL_USER}>`,
            to: recipients,
            replyTo: email,
            subject: `New Manuscript Submission: ${bookTitle}`,
            text: `
New Manuscript Submission

Author Details:
Name: ${fullName}
Pen Name: ${penName || "N/A"}
Email: ${email}
Phone: ${phone}

Address:
${addressLine}

Book Details:
Title: ${bookTitle}
Genre: ${genre}
Word Count: ${wordCount}
Target Audience: ${audience || "N/A"}
Synopsis: ${synopsis}
Notes: ${notes || "N/A"}
Manuscript File: ${uploadedFile.name}
            `.trim(),
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #3F3774; border-bottom: 2px solid #FE695B; padding-bottom: 10px;">New Manuscript Submission</h2>
        <h3 style="color: #3F3774;">Author Details</h3>
        ${renderRow("Name", fullName)}
        ${renderRow("Pen Name", penName)}
        ${renderRow("Email", email)}
        ${renderRow("Phone", phone)}
        <h3 style="color: #3F3774;">Address</h3>
        ${renderRow("Street", street)}
        ${renderRow("Apartment / Suite", apartment)}
        ${renderRow("City", city)}
        ${renderRow("State / Province", state)}
        ${renderRow("Postal Code", postalCode)}
        ${renderRow("Country", country)}
        <h3 style="color: #3F3774;">Book Details</h3>
        ${renderRow("Title", bookTitle)}
        ${renderRow("Genre", genre)}
        ${renderRow("Word Count", wordCount)}
        ${renderRow("Target Audience", audience)}
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Synopsis:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(synopsis)}</p>
        </div>
        ${notes ? `<div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 12px;"><p><strong>Additional Notes:</strong></p><p style="white-space: pre-wrap;">${escapeHtml(notes)}</p></div>` : ""}
        ${renderRow("Manuscript File", uploadedFile.name)}
        ${
            hasPpcData(trackingData)
                ? `
        <div style="background: #f3f7ff; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #3F3774;">
            <h3 style="color: #3F3774; margin-top: 0;">PPC / Marketing Attribution</h3>
            ${renderRow("UTM Source", utm_source)}
            ${renderRow("UTM Medium", utm_medium)}
            ${renderRow("UTM Campaign", utm_campaign)}
            ${renderRow("UTM Term", utm_term)}
            ${renderRow("UTM Content", utm_content)}
            ${renderRow("Google Click ID (gclid)", gclid)}
            ${renderRow("Facebook Click ID (fbclid)", fbclid)}
            ${renderRow("Microsoft Click ID (msclkid)", msclkid)}
            ${renderRow("Landing Page", landing_page)}
            ${renderRow("Previous Page", previous_page)}
            ${renderRow("Submitted From", current_page)}
            ${renderRow("Referrer", referrer)}
            ${renderRow("User Agent", user_agent)}
        </div>`
                : ""
        }
        <footer style="margin-top: 20px; font-size: 12px; color: #777; text-align: center;">
            <p>This email was sent from the Aero Publishing manuscript submission form.</p>
        </footer>
      </div>
            `,
            attachments: [
                {
                    filename: uploadedFile.name,
                    content: fileBuffer,
                    contentType: uploadedFile.type || "application/octet-stream",
                },
            ],
        });

        try {
            await transporter.sendMail({
                from: `Aero Publishing <${GMAIL_USER}>`,
                to: email,
                replyTo: GMAIL_USER,
                subject: "Thank you for submitting your manuscript | Aero Publishing",
                text: `Dear ${fullName || "Author"},\n\nThank you for trusting Aero Publishing with your manuscript, "${bookTitle}". Our editorial team has received your submission and will be in touch shortly.\n\nIf you have questions, reply to this email or call +1 424 282 3304.\n\nWarmly,\nThe Aero Publishing Team`,
                html: authorThankYouHtml(fullName, bookTitle),
            });
        } catch (thankYouError) {
            console.error("Failed to send author thank-you email:", thankYouError);
        }

        return { success: true, message: "Manuscript submitted successfully" };
    } catch (error: unknown) {
        console.error("Error sending manuscript submission:", error);
        const message = error instanceof Error ? error.message : "Failed to send manuscript";
        return { success: false, message };
    }
}
