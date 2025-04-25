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
        Schema::create('hero_section', function (Blueprint $table) {
            $table->increments('id');

            // Поле event_date типа varchar(255)
            $table->string('event_date', 255)
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле title типа varchar(255)
            $table->string('title', 255)
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле background_image типа varchar(255)
            $table->string('background_image', 255)
                  ->nullable()
                  ->collation('utf8mb4_0900_ai_ci');

            // Поле right_image типа varchar(255)
            $table->string('right_image', 255)
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
        Schema::dropIfExists('hero_section');
    }
};
