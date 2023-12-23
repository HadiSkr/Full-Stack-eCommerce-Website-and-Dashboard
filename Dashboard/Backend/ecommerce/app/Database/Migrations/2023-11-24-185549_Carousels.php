<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCarouselsTable extends Migration
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
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => 100
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true
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

        $this->forge->addKey('id', true);
        $this->forge->createTable('carousels');
    }

    public function down()
    {
        $this->forge->dropTable('carousels');
    }
}
