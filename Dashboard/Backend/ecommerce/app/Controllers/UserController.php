<?php
namespace App\Controllers;
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Origin: http://localhost");
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Access-Control-Max-Age: 86400"); // Optional: specify the maximum time the preflight response can be cached
header('Access-Control-Allow-Origin: *');
// Allow specific HTTP methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Origin, Content-Type');
// Set the response content type
header('Content-Type: application/json');
// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Return empty response for preflight requests
    http_response_code(204);
    exit;
}


use App\Controllers\BaseController;
use CodeIgniter\Database\ConnectionInterface;
use App\Models\User; 
use App\Models\Role; 
use App\Models\RolePermission; 
use App\Models\Permission; 

class UserController extends BaseController
{
  
    
    public function options()
    {
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Origin: http://localhost");
      header('Access-Control-Allow-Headers: *');
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      header("Access-Control-Allow-Origin: *");
      return $this->response->setStatusCode(200);
      exit;
    }



    public function signup()
{
    $data = $this->request->getJSON(true);
    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

    $currentTimestamp = date('Y-m-d H:i:s');
    $data['created_at'] = $currentTimestamp;
    $data['updated_at'] = $currentTimestamp;

    $model = new \App\Models\User();

    $existingUser = $model->where('email', $data['email'])
                          ->orWhere('phone', $data['phone'])
                          ->first();

    if ($existingUser) {
        $response = ['success' => false, 'message' => 'Email or phone number is already registered'];
    } else {
        try {
            $model->insert($data);
            $response = ['success' => true];
        } catch (\Exception $e) {
            $response = ['success' => false, 'message' => 'An error occurred while registering the user'];
        }
    }

    return $this->response->setJSON($response)
                          ->setHeader('Content-Type', 'application/json');
}

public function signin()
{

    $data = $this->request->getJSON(true);
    $email = $data['email'];
    $password = $data['password'];

    $model = new \App\Models\User();
    $user = $model->where('email', $email)->first();

    if (!$user) {
        return json_encode(['success' => false, 'message' => 'Email not registered']);
    }

    if (password_verify($password, $user['password'])) {
        $response = ['success' => true];
    } else {
        return json_encode(['success' => false, 'message' => 'Bad credentials']);
    }
    return $this->response->setJSON($response)
                          ->setHeader('Content-Type', 'application/json');
}




public function getusersrolesinfo()
{
    $this->UserModel = new User();
    $this->RoleModel = new Role();
    $this->PermissionModel = new Permission();
    $this->RolePermissionModel = new RolePermission();

    $users = $this->UserModel->findAll();

    $roles = $this->RoleModel->findAll();

    $permissions = $this->PermissionModel->findAll();

    $rolePermissions = $this->RolePermissionModel->findAll();

    $results = array();

    foreach ($users as $user) {
        $roleId = $user['role_id'];
        $userRole = null;
        foreach ($roles as $role) {
            if ($role['id'] === $roleId) {
                $userRole = $role['name'];
                break;
            }
        }

        $userPermissions = array();
        foreach ($rolePermissions as $rolePermission) {
            if ($rolePermission['role_id'] === $roleId) {
                $permissionId = $rolePermission['permission_id'];
                foreach ($permissions as $permission) {
                    if ($permission['id'] === $permissionId) {
                        $userPermissions[] = $permission['name'];
                        break;
                    }
                }
            }
        }

        $userData = array(
            'id' => $user['id'],
            'name' => $user['full_name'],
            'email' => $user['email'],
            'phone' => $user['phone'],


            'role' => $userRole,
            'permissions' => $userPermissions
        );

        $results[] = $userData;
    }

    return $this->response->setJSON($results);
}
public function deletesuer($id)
{
    $UserModel = new User();
    $user = $UserModel->find($id);

    if ($user) {
        $UserModel->delete($id);
        return $this->response->setJSON(['success' => true, 'message' => 'user deleted successfully.']);
    } else {
        return $this->response->setJSON(['success' => false, 'message' => 'user not found.']);
    }
}

public function getroles()
{
    $this->RoleModel = new Role();
    $this->PermissionModel = new Permission();
    $this->RolePermissionModel = new RolePermission();

    $roles = $this->RoleModel->findAll();

    $permissions = $this->PermissionModel->findAll();

    $rolePermissions = $this->RolePermissionModel->findAll();

    foreach ($roles as &$role) {
        $roleId = $role['id'];

        $rolePermissionsArray = array();
        foreach ($rolePermissions as $rolePermission) {
            if ($rolePermission['role_id'] === $roleId) {
                $permissionId = $rolePermission['permission_id'];
                foreach ($permissions as $permission) {
                    if ($permission['id'] === $permissionId) {
                        $rolePermissionsArray[] = $permission['name'];
                        break;
                    }
                }
            }
        }

        $role['permissions'] = $rolePermissionsArray;
    }

    return $this->response->setJSON($roles);
}

public function getpermissions()  {
    $this->PermissionModel = new Permission();
    $permission = $this->PermissionModel->findAll();
    return $this->response->setJSON($permission);
}



}
