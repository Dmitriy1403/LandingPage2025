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
        Schema::create('registration', function (Blueprint $table) {


            $table->increments('id');

            // 2. groupName: varchar(200), collation utf8mb4_general_ci, допускает NULL
            $table->string('groupName', 200)
                  ->nullable()
                  ->collation('utf8mb4_general_ci');

            // 3. participantsNumber: int, допускает NULL
            $table->integer('participantsNumber')->nullable();

            // 4. contactPerson: varchar(50), collation utf8mb4_general_ci, допускает NULL
            $table->string('contactPerson', 50)
                  ->nullable()
                  ->collation('utf8mb4_general_ci');

            // 5. email: varchar(100), collation utf8mb4_general_ci, допускает NULL, с индексом
            $table->string('email', 100)
                  ->nullable()
                  ->collation('utf8mb4_general_ci')
                  ->index();

            // 6. phone: varchar(20), collation utf8mb4_general_ci, допускает NULL
            $table->string('phone', 20)
                  ->nullable()
                  ->collation('utf8mb4_general_ci');

            // 7. comments: varchar(1000), collation utf8mb4_general_ci, допускает NULL
            $table->string('comments', 1000)
                  ->nullable()
                  ->collation('utf8mb4_general_ci');

            // 8-9. created_at и updated_at: timestamp, допускают NULL
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();


            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration');
    }
};
