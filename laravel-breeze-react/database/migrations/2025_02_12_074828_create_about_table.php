<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_section', function (Blueprint $table) {
            $table->increments('id');

            // Поле title типа varchar(255)
            $table->string('title', 255)
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле description типа text
            $table->text('description')
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле features типа text
            $table->text('features')
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле image_left типа varchar(255)
            $table->string('image_left', 255)
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поля created_at и updated_at
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_section');
    }
};
