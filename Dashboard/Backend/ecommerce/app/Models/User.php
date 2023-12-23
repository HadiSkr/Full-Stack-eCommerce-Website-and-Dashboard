<?php

namespace App\Models;

use CodeIgniter\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';

    protected $allowedFields = [
        'full_name',
        'email',
        'phone',
        'password',
        'created_at',
        'updated_at',
        'deleted_at',
        'role_id',
    ];

     // Dates
     protected $useTimestamps = true;
     protected $dateFormat    = 'datetime';
     protected $createdField  = 'created_at';
     protected $updatedField  = 'updated_at';
     //protected $deletedField  = 'deleted_at';
 
     // Validation
     protected $validationRules      = [];
     protected $validationMessages   = [];
     protected $skipValidation       = false;
     protected $cleanValidationRules = true;
 
     // Callbacks
     protected $allowCallbacks = true;
     protected $beforeInsert   = [];
     protected $afterInsert    = [];
     protected $beforeUpdate   = [];
     protected $afterUpdate    = [];
     protected $beforeFind     = [];
     protected $afterFind      = [];
     protected $beforeDelete   = [];
     protected $afterDelete    = [];
}