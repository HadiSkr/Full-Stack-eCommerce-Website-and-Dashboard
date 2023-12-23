<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Carousel; 
use App\Models\Image; 

class CarouselController extends BaseController
{
    public function index()
    {
        $this->CarouselModel = new Carousel();
        $carousles = $this->CarouselModel->findAll();
        return $this->response->setJSON($carousles);
    }


    public function deletecarousel($id)
{
    $CarouselModel = new Carousel();
    $Carousel = $CarouselModel->find($id);

    if ($Carousel) {
        $CarouselModel->delete($id);
        return $this->response->setJSON(['success' => true, 'message' => 'carousel deleted successfully.']);
    } else {
        return $this->response->setJSON(['success' => false, 'message' => 'carousel not found.']);
    }
}

public function insertImage($id) {
    $imageModel = new Image();
   
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $filename = uniqid() . '.jpg';
        echo($id);
        $upload_path = FCPATH . 'CarouselImages';

        move_uploaded_file($file['tmp_name'], $upload_path . '/' . $filename);

        $imageModel->insert([
            'product_id' => null,
            'filename' => $filename,
            'category_id' => null,
            'carousel_id' => $id
        ]);
        
        $response = ['message' => 'Image added'];
        return $this->response->setJSON($response)
            ->setHeader('Content-Type', 'application/json');
    }
}
public function insertCarousel()
{
    $name = $_POST['title'];
    $description = $_POST['description'];

    $CarouselModel = new Carousel();

    $CarouselModel->insert([
        'title' => $name,
        'description' => $description,
    ]);
    
    $response = ['message' => 'carousel added'];
    return $this->response->setJSON($response)
        ->setHeader('Content-Type', 'application/json');
}


}
