<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

header("Content-Type: text/plain; charset=UTF-8");
ini_set('display_errors', 0);
error_reporting(0);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "ERROR: Invalid request.";
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$phone || !$subject || !$message) {
    echo "ERROR: All fields are required.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "ERROR: Invalid email.";
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'xenotrixtech@gmail.com';   // Gmail
    $mail->Password   = 'bfaq tgbs xmxm jnmi';       // App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Gmail requires authenticated FROM
    $mail->setFrom('xenotrixtech@gmail.com', 'Website Contact Form');
    $mail->addReplyTo($email, $name);

    // Receiver
    $mail->addAddress('sanjayskpy7@gmail.com');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New Contact Form: $subject";
    $mail->Body = "
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Subject:</strong> {$subject}</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();
    echo "SUCCESS: Email sent.";

} catch (Exception $e) {
    echo "ERROR: " . $mail->ErrorInfo;
}

exit;
