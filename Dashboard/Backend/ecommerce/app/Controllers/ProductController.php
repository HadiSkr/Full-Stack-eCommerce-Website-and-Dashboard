<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use App\Models\Image; 

use CodeIgniter\Controller;

class ProductController extends BaseController
{
    public function index()
    {
        $productModel = new ProductModel();
        $products = $productModel->getAllProducts();
        
        return $this->response->setJSON($products);
        }



 public function delete($id)
{
    $productModel = new ProductModel();
    $product = $productModel->find($id);

    if ($product) {
        $productModel->delete($id);
        return $this->response->setJSON(['success' => true, 'message' => 'Product deleted successfully.']);
    } else {
        return $this->response->setJSON(['success' => false, 'message' => 'Product not found.']);
    }
}


public function insertproduct()
{
    $productModel = new ProductModel();
    $imageModel = new Image();
    $name = $_POST['name'];
    $sort = $_POST['sort_order'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];
    $category_id = $_POST['category_id'];
    $price = $_POST['price'];
    $productModel->insert([
        'name' => $name,
        'sort_order' => $sort,
        'amount' => $amount,
        'description' => $description,
        'category_id' => $category_id,
         'price' => $price,


    ]);

    $productId = $productModel->insertID();

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $filename = uniqid() . '.jpg';

        $upload_path = FCPATH . 'ProductsImages';

        move_uploaded_file($file['tmp_name'], $upload_path . '/' . $filename);

        $imageModel->insert([
            'product_id' => $productId,
            'filename' => $filename,
            'category_id'=> null
        ]);
    }

    $response = ['message' => 'Product added'];
    return $this->response->setJSON($response)
        ->setHeader('Content-Type', 'application/json');
}

public function editProduct($productId)
{
    $productModel = new ProductModel();
    $imageModel = new Image();
    $product = $productModel->find($productId);
    
    if (!$product) {
        $response = ['message' => 'Product not found'];
        return $this->response->setJSON($response)
            ->setHeader('Content-Type', 'application/json');
    }

    $image = $imageModel->where('product_id', $productId)->first();

    $name = $_POST['name'];
    $sort = $_POST['sort_order'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];
    $category_id = $_POST['category_id'];
    $price = $_POST['price'];   

    $productModel->update($productId, [
        'name' => $name,
        'sort_order' => $sort,
        'amount' => $amount,
        'description' => $description,
        'category_id' => $category_id,
        'price' => $price,
    ]);

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $filename = uniqid() . '.jpg';

        $upload_path = FCPATH . 'ProductsImages';

        move_uploaded_file($file['tmp_name'], $upload_path . '/' . $filename);

        if ($image) {
            $imageModel->update($image['id'], ['filename' => $filename]);
        } else {
            $imageModel->insert([
                'product_id' => $productId,
                'filename' => $filename,
                'category_id' => null
            ]);
        }
    }

    $response = ['message' => 'Product updated'];
    return $this->response->setJSON($response)
        ->setHeader('Content-Type', 'application/json');
}

}
