<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

header('Content-Type: application/json');

$response = ['status' => 'success', 'message' => 'Your message has been sent!'];
echo json_encode($response);
exit;

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Optional reCAPTCHA validation
/*$recaptchaResponse = $_POST['recaptcha-response'] ?? '';
$recaptchaSecret = 'YOUR_RECAPTCHA_SECRET_KEY';
if ($recaptchaResponse) {
    $recaptchaVerify = file_get_contents(
        'https://www.google.com/recaptcha/api/siteverify?secret=' . $recaptchaSecret . '&response=' . $recaptchaResponse
    );
    $recaptchaData = json_decode($recaptchaVerify);
    if (!$recaptchaData->success || $recaptchaData->score < 0.5) {
        echo json_encode(['status' => 'error', 'message' => 'reCAPTCHA verification failed.']);
        exit;
    }
}*/

// Basic validation
if (!$name || !$email || !$phone || !$subject || !$message) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
    exit;
}

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'xenotrixtech@gmail.com';
    $mail->Password   = 'dxez rnah ynlu yyht';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('sanjayskpy7@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = "New Contact Form: $subject";
    $mail->Body    = "
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Service:</strong> {$subject}</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
}
