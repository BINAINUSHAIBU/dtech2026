<?php
/**
 * ===========================================
 * BTECH-TV WORLD ULTRA MAX X
 * API: login.php
 * ===========================================
 */

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
session_start();

/*
|--------------------------------------------------------------------------
| Demo Users
|--------------------------------------------------------------------------
|
| Replace with a database in production.
|
*/

$users = [

    [
        "id"       => 1,
        "username" => "admin",
        "password" => "admin123",
        "role"     => "Administrator",
        "name"     => "BTECH Admin"
    ],

    [
        "id"       => 2,
        "username" => "user",
        "password" => "user123",
        "role"     => "Viewer",
        "name"     => "Demo User"
    ],

    [
        "id"       => 3,
        "username" => "superadmin",
        "password" => "super123",
        "role"     => "Super Administrator",
        "name"     => "BTECH Super Admin"
    ]

];

/*
|--------------------------------------------------------------------------
| Read JSON or Form Data
|--------------------------------------------------------------------------
*/

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? $_POST["username"] ?? "");
$password = trim($data["password"] ?? $_POST["password"] ?? "");

/*
|--------------------------------------------------------------------------
| Validate
|--------------------------------------------------------------------------
*/

if ($username == "" || $password == "") {

    echo json_encode([
        "success" => false,
        "message" => "Username and password are required."
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Authenticate
|--------------------------------------------------------------------------
*/

foreach ($users as $user) {

    if (
        strtolower($user["username"]) == strtolower($username)
        && $user["password"] == $password
    ) {

        $_SESSION["loggedin"] = true;
        $_SESSION["user"] = $user;

        echo json_encode([

            "success" => true,

            "message" => "Login successful.",

            "user" => [

                "id"       => $user["id"],
                "name"     => $user["name"],
                "username" => $user["username"],
                "role"     => $user["role"]

            ]

        ], JSON_PRETTY_PRINT);

        exit;
    }
}

/*
|--------------------------------------------------------------------------
| Failed Login
|--------------------------------------------------------------------------
*/

echo json_encode([

    "success" => false,

    "message" => "Invalid username or password."

], JSON_PRETTY_PRINT);
