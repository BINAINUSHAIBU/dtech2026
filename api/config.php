<?php
/**
 * ===========================================
 * BTECH-TV WORLD ULTRA MAX X
 * API Configuration
 * File: api/config.php
 * ===========================================
 */

date_default_timezone_set("Africa/Lagos");

/*
|--------------------------------------------------------------------------
| Application
|--------------------------------------------------------------------------
*/

define("APP_NAME", "BTECH-TV WORLD ULTRA MAX X");
define("APP_VERSION", "1.0.0");
define("APP_URL", "http://localhost/BTECH-TV");

/*
|--------------------------------------------------------------------------
| Database Configuration
|--------------------------------------------------------------------------
| Update these values for your MySQL server.
*/

define("DB_HOST", "localhost");
define("DB_NAME", "btechtv");
define("DB_USER", "root");
define("DB_PASS", "");

/*
|--------------------------------------------------------------------------
| Create Database Connection
|--------------------------------------------------------------------------
*/

try {

    $pdo = new PDO(

        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",

        DB_USER,

        DB_PASS,

        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]

    );

} catch (PDOException $e) {

    die(json_encode([
        "success" => false,
        "message" => "Database Connection Failed",
        "error" => $e->getMessage()
    ]));

}

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

function response($success, $message = "", $data = [])
{

    echo json_encode([

        "success" => $success,

        "message" => $message,

        "timestamp" => date("Y-m-d H:i:s"),

        "data" => $data

    ], JSON_PRETTY_PRINT);

    exit;
}

function generateToken($length = 32)
{
    return bin2hex(random_bytes($length / 2));
}

function sanitize($text)
{
    return htmlspecialchars(trim($text), ENT_QUOTES, "UTF-8");
}

function isLoggedIn()
{
    return isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true;
}

function requireLogin()
{
    if (!isLoggedIn()) {

        response(false, "Unauthorized Access");

    }
}

/*
|--------------------------------------------------------------------------
| Demo Settings
|--------------------------------------------------------------------------
*/

$SETTINGS = [

    "trial_minutes" => 2,

    "max_channels" => 10000,

    "stream_timeout" => 20,

    "enable_cache" => true,

    "enable_favorites" => true,

    "enable_recent" => true,

    "enable_downloads" => true,

    "enable_recording" => false,

    "maintenance_mode" => false

];

/*
|--------------------------------------------------------------------------
| End Configuration
|--------------------------------------------------------------------------
*/
?>
