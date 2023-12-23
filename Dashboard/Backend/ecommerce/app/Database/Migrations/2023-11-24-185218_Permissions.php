<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Permissions extends Migration
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
        'name' => [
            'type' => 'VARCHAR',
            'constraint' => 100
        ],
        'permissions' => [
            'type' => 'TEXT',
            'null' => true
        ],
    ]);

    $this->forge->addKey('id', true);
    $this->forge->createTable('roles');
}

    public function down()
    {
        //
    }
}
