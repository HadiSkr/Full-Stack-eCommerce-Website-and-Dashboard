<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Category; 
use App\Models\Image; 


class CategoryController extends BaseController
{
    public function index()
    {
        $categoryModel = new Category();
        $categories = $categoryModel->getAllCategories();
        
        return $this->response->setJSON($categories);
    }


    public function delete($id)
{
    $Category = new Category();
    $dCategory = $Category->find($id);

    if ($dCategory) {
        $Category->delete($id);
        return $this->response->setJSON(['success' => true, 'message' => 'category deleted successfully.']);
    } else {
        return $this->response->setJSON(['success' => false, 'message' => 'category not found.']);
    }
}

public function insertCategory()
{
    $name = $_POST['categoryname'];
    $sort = $_POST['sort_order'];
    $description = $_POST['description'];

    $categoryModel = new Category();
    $imageModel = new Image();

    $categoryModel->insert([
        'categoryname' => $name,
        'sort_order' => $sort,
        'description' => $description,
    ]);

    $categoryId = $categoryModel->insertID();

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $filename = uniqid() . '.jpg';

        $upload_path = FCPATH . 'CategoriesImages';

        move_uploaded_file($file['tmp_name'], $upload_path . '/' . $filename);

        $imageModel->insert([
            'category_id' => $categoryId,
            'filename' => $filename,
            'product_id'=> null
        ]);
    }

    $response = ['message' => 'Category added'];
    return $this->response->setJSON($response)
        ->setHeader('Content-Type', 'application/json');
}

public function editgategory($categryId)
{
    $CategoryModel = new Category();
    $imageModel = new Image();
    $category = $CategoryModel->find($categryId);
    
    if (!$category) {
        $response = ['message' => 'category not found'];
        return $this->response->setJSON($response)
            ->setHeader('Content-Type', 'application/json');
    }

    $image = $imageModel->where('product_id', $categryId)->first();

    $categoryname = $_POST['categoryname'];
    $sort_order = $_POST['sort_order'];
    $description = $_POST['description'];
   
    $CategoryModel->update($categryId, [
        'categoryname' => $categoryname,
        'sort_order' => $sort_order,
        'description' => $description,
        
    ]);

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['file'];
        $filename = uniqid() . '.jpg';

        $upload_path = FCPATH . 'CategoriesImages';

        move_uploaded_file($file['tmp_name'], $upload_path . '/' . $filename);

        if ($image) {
            $imageModel->update($image['id'], ['filename' => $filename]);
        } else {
            $imageModel->insert([
                'product_id' => null,
                'filename' => $filename,
                'category_id' => $categryId
            ]);
        }
    }

    $response = ['message' => 'category updated'];
    return $this->response->setJSON($response)
        ->setHeader('Content-Type', 'application/json');
}



}   
