<?php
use Elastic\Elasticsearch\ClientBuilder;
require 'C:\xampp\htdocs\project_DBMS\LMS_project\vendor\autoload.php';
function search_books($keyword)
{
    //Khai báo thông tin của API key
    $apiKeyId = 'Zmk4YVRZOEJTQTNRdmVHNW9QUWg6eTdaRXloWmxTTG1pdzI0NFVORkpzZw==';

    // Khởi tạo kết nối tới ElasticSearch
    $client = ClientBuilder::create()
        ->setHosts(['https://e835a2f73a6842edb4d97d520a7f7a53.us-central1.gcp.cloud.es.io:443'])
        ->setApiKey($apiKeyId)
        ->build();

    // Tạo truy vấn ElasticSearch với điều kiện match_phrase với title hoặc author
    $params = [
        'index' => 'rdbms_idx',
        'body' => [
            'query' => [
                'bool' => [
                    'should' => [
                        ['match_phrase' => ['title' => $keyword]],
                        ['match_phrase' => ['author' => $keyword]]
                    ]
                ]
            ]
        ]
    ];

    // Thực hiện truy vấn ElasticSearch
    $response = $client->search($params);

    // Mảng lưu trữ kết quả cuối cùng
    $data = array();

    // Lặp qua kết quả ElasticSearch
    foreach ($response['hits']['hits'] as $hit) {
        // Truy cập vào trường "_source" để lấy thông tin
        $source = $hit['_source'];

        // Tạo một mảng mới chứa thông tin title, author, và image
        $item = array(
            'id' => $source['id'],
            'name' => $source['title'],
            'author' => $source['author'],
            'imageSrc' => $source['image']
        );

        // Thêm mảng mới vào mảng kết quả cuối cùng
        $data[] = $item;
        
    }

    // Trả về mảng kết quả
    return $data;
}

// Kiểm tra xem dữ liệu đã được gửi từ form chưa
if (isset($_POST['searchData'])) {
    // Lấy từ khóa tìm kiếm từ dữ liệu POST
    $keyword = $_POST['searchData'];

    // Gọi hàm search_books để tìm kiếm và trả về kết quả
    $searchResult = search_books($keyword);

    // Trả về kết quả tìm kiếm dưới dạng JSON
    echo json_encode($searchResult);
}
?>