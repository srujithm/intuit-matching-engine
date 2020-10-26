import nodemailer from 'nodemailer';

export const sendMail = async (req, res) => {
    let email_list = req.body.recepients;
    let email_attachments = req.body.attachments;
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
    try {
        let info = await transporter.sendMail({
            from: 'Intuit Matching  Engine <maten@example.com>',
            to: email_list.join(","),
            subject: "Reconciled data from Intuit Matching Engine",
            html: '<p>Hi Person,<p>\
            <p>Anomalies between Workday and Alight has been identified and fixed. Please check attached documents to get the latest data for all  employees.</p>',
            attachments: email_attachments
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return res.status(200).send({})
    } catch (e) {
        console.log("Unable to  send the data: %s", e);
        return res.status(500).send(e);
    }
};