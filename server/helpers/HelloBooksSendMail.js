/*
eslint-disable
*/
import nodemailer from 'nodemailer';


/**
 * 
 * @param {object} userInfo
 *
 * @param {string} token 
 */
class HelloBooksSendMail {
  constructor(userInfo, token) {
    this.appURL = process.env.APP_URL;
    this.recipientEmail = userInfo.userEmail;
    this.recipientName = `${userInfo.userFirstName} ${userInfo.userLastName}`;
    this.subject = `Hi ${userInfo.userFirstName} Please Verify Your Email`;
    this.username = userInfo.username;
    this.htmlEmail = '';
    this.verificationEmailLink = `${this.appURL}/user/verify?key=${token}&id=${userInfo.username}`;
  }
  /**
   * @returns {promise} {resolve if mail sent}
   */
  sendVerificationEmail() {
    return new Promise((resolve, reject) => {
      
      const transporter =
        nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
      });
      
      this.emailContent();
      const message = {
        from: '"Hello Books" <hello.books@delis.xyz>',
        to: `${this.recipientName} <${this.recipientEmail}>`,
        subject: this.subject,
        text: `Please Verify Your email Address with link ${this.verificationEmailLink}`,
        html: this.htmlEmail
      };

      if (!this.recipientEmail) {
        reject('No Recipient Email');
      } else {
        transporter
          .sendMail(message);
        resolve('Mail Sent');
      }
    });
  }
  emailContent() {
    let htmlEmail = `<head><title></title>
        <style type="text/css">
        #outlook a { padding: 0; }
        .ReadMsgBody {width: 100%; background-color: #ffffff;}
        .ExternalClass {width: 100%; background-color: #ffffff;}
        body { margin: 0; padding: 0; 
          -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; 
          font-family:'Avenir Next', Avenir, sans-serif;}
        table, td { border-collapse:collapse; 
          mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; 
          outline: none; text-decoration: none; 
          -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
          @media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }
        </style>
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->`;
    htmlEmail += `<style type="text/css">
    @media only screen and (max-width:480px) {
      mj-column-per-100, * [aria-labelledby="mj-column-per-100"] 
      { width:100%!important; }
      .mj-column-per-80, * [aria-labelledby="mj-column-per-80"] 
      { width:80%!important; }
      .mj-column-per-30, * [aria-labelledby="mj-column-per-30"] 
      { width:30%!important; }
      .mj-column-per-70, * [aria-labelledby="mj-column-per-70"] 
      { width:70%!important; }
    }
    </style></head>`;
    htmlEmail += `<body style="background: #E3E5E7;">
    <div style="background-color:#E3E5E7;"><!--[if mso | IE]>
        <table border="0" cellpadding="0" 
        cellspacing="0" width="600" align="center" style="width:600px;">
          <tr>
            <td 
            style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->`;
    htmlEmail += `<div style="margin:0 auto;max-width:600px;background:white;">
      <table cellpadding="0" cellspacing="0" align="center" border="0"
      style="font-size:0px;width:100%;background:white;">
      <tbody><tr>
      <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">`;
    htmlEmail += `<!--[if mso | IE]>
        <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->`;
    htmlEmail += `<div aria-labelledby="mj-column-per-100" class="mj-column-per-100" 
      style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
      <tbody><tr>
      <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" 
      align="center" border="0"><tbody><tr><td style="width:80px;">
      <a href="${this.appURL}" target="_blank">
      <img alt="auth0" title="" height="auto" 
      src="https://res.cloudinary.com/dmdl6p9mx/image/upload/v1508063907/home_books_logo_thcnyv.png" 
      style="border:none;border-radius:;display:block;outline:none;text-decoration:none;height:auto;" 
      width="140"></a></td></tr></tbody></table></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->`;
    htmlEmail += `<!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" 
      width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->`;
    htmlEmail += `<div style="margin:0 auto;max-width:600px;background:#383d61;">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#383d61;" 
      align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:480px;">
      <![endif]-->`;
    htmlEmail += `<div aria-labelledby="mj-column-per-80" class="mj-column-per-80" 
      style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
      <tbody><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:30px;" align="center">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
      <tbody><tr><td style="width:80px;">`;
    htmlEmail += `<img alt="Zero To Launch" title="" 
    height="auto" src="https://cdn.auth0.com/website/emails/product/top-verify.png" 
    style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:auto;" width="80">
    </td></tr></tbody></table></td></tr><tr>
      <td style="word-break:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center">
      <div style="cursor:auto;color:white;font-size:32px;line-height:60ps;">
      Verify Your Account
      </div></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->`;
    htmlEmail += `<div style="margin:0 auto;max-width:600px;background:white;">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
      <tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:40px 25px 0px;">
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->`;
    htmlEmail += `<div aria-labelledby="mj-column-per-100" class="mj-column-per-100" 
      style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody><tr>
      <td style="word-break:break-word;font-size:0px;padding:0px 0px 25px;" align="left">
      <div style="cursor:auto;color:#222228;font-size:18px;font-weight:500;line-height:30px;">
      Please Verify Your account Details Below
      </div></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
      </td><td style="vertical-align:top;width:180px;">
      <![endif]-->
      <div aria-labelledby="mj-column-per-30" class="mj-column-per-30" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 10px;" align="left">
      <div style="cursor:auto;color:#222228;font-size:16px;line-height:30px;">
          <strong style="font-weight: 500; white-space: nowrap;">Email:</strong>
        </div></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
      </td><td style="vertical-align:top;width:420px;">
      <![endif]-->
      <div aria-labelledby="mj-column-per-70" class="mj-column-per-70" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 10px;" align="left">
      <div style="cursor:auto;color:#222228;font-size:16px;line-height:30px;">
          ${this.recipientEmail}
      </div></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
        </td><td style="vertical-align:top;width:180px;">
        <![endif]--></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->`;

    htmlEmail += `<div style="margin:0 auto;max-width:600px;background:white;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0">
    <tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px 30px;"><!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:600px;">
      <![endif]--><p style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;"></p><!--[if mso | IE]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0 auto;border-top:1px solid #E3E5E7;width:100%;" width="600">
      <tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]--><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div style="margin:0 auto;max-width:600px;background:white;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:white;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">`;

    htmlEmail += `<!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
      <table cellpadding="0" cellspacing="0" align="center" border="0"><tbody><tr>
      <td style="border-radius:3px;color:white;cursor:auto;" align="center" valign="middle" bgcolor="#EB5424">
      <a href="${this.verificationEmailLink}"
      style="display:inline-block;text-decoration:none;background:#fb8962;border-radius:3px;color:white;font-size:14px;font-weight:500;line-height:35px;padding:10px 25px;margin:0px;" target="_blank">
            Confirm Email Address!!!
      </a></td></tr></tbody></table></td></tr></tbody></table></div>`;
    htmlEmail += `<!--[if mso | IE]>
    </td></tr></table>
    <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
      <tr>
        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->`;
    htmlEmail += `<div style="margin:0 auto;max-width:600px;background:#F5F7F9;">
      <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#F5F7F9;" align="center" border="0">
      <tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;">
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
      <![endif]-->
      <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
      <table cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
      <tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 20px;" align="center">
      <div style="cursor:auto;color:#222228;font-size:13px;line-height:20px;">`;

    htmlEmail += 'You are only receiving this email cos you signed up on Hello Books.<br>';
    htmlEmail += 'If you cannot remember doing this, It is possible someone else used your email address to register.<br>';
    htmlEmail += 'And you can just ignore this email';

    htmlEmail += `</div></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></div></body>`;
    this.htmlEmail = htmlEmail;
    return htmlEmail;
  }
}
export default HelloBooksSendMail;
