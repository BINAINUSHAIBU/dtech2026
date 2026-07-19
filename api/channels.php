<?php
/**
 * ===========================================
 * BTECH-TV WORLD ULTRA MAX X
 * API: channels.php
 * ===========================================
 */

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Cache-Control: no-cache");

/*
|--------------------------------------------------------------------------
| Load Local Channel Database
|--------------------------------------------------------------------------
*/

$file = __DIR__ . "/../data/channels.json";

if (!file_exists($file)) {

    echo json_encode([
        "success" => false,
        "message" => "channels.json not found."
    ]);

    exit;
}

$channels = json_decode(file_get_contents($file), true);

if (!$channels) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON format."
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Optional Filters
|--------------------------------------------------------------------------
*/

$country  = isset($_GET["country"]) ? strtolower($_GET["country"]) : "";
$category = isset($_GET["category"]) ? strtolower($_GET["category"]) : "";
$language = isset($_GET["language"]) ? strtolower($_GET["language"]) : "";
$search   = isset($_GET["search"]) ? strtolower($_GET["search"]) : "";

$result = array_filter($channels, function ($channel) use ($country, $category, $language, $search) {

    if ($country && strtolower($channel["country"]) != $country)
        return false;

    if ($category && strtolower($channel["category"]) != $category)
        return false;

    if ($language && strtolower($channel["language"]) != $language)
        return false;

    if ($search && stripos($channel["name"], $search) === false)
        return false;

    return true;
});

$result = array_values($result);

/*
|--------------------------------------------------------------------------
| Output
|--------------------------------------------------------------------------
*/

echo json_encode([

    "success" => true,

    "project" => "BTECH-TV WORLD ULTRA MAX X",

    "total_channels" => count($result),

    "server_time" => date("Y-m-d H:i:s"),

    "channels" => $result

], JSON_PRETTY_PRINT);
