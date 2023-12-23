<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'full_name' => [
                'type' => 'VARCHAR',
                'constraint' => 100
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'unique' => true
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'unique' => true
            ],
            'role_id' => [
                'type' => 'integer',
                'constraint' => 4,
                'unsigned' => true,     
                'default' => '0'
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'created_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
                'default' => null
            ],
            'updated_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
                'default' => null
            ],
            'deleted_at' => [
                'type' => 'TIMESTAMP',
                'null' => true,
                'default' => null
            ],
        ]);
        $this->forge->addForeignKey('role_id', 'roles', 'id', 'CASCADE', 'NO ACTION');
        $this->forge->addKey('id', true);
        $this->forge->createTable('users');
    }
    

    public function down()
    {
        $this->forge->dropTable('users');
    }
}