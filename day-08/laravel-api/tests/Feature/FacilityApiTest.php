<?php

namespace Tests\Feature;

use App\Models\Facility;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacilityApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_fetch_facilities(): void
    {
        Facility::factory()->create([
            'name' => 'Test HQ',
            'location' => 'Building 1',
            'type' => 'Office',
            'status' => 'Good',
            'description' => 'Test facility',
        ]);

        $response = $this->getJson('/api/facilities');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'location', 'type', 'status'],
                ],
            ]);
    }

    public function test_can_create_facility(): void
    {
        $payload = [
            'name' => 'New Testing Hub',
            'location' => 'Zone 9',
            'type' => 'Laboratory',
            'status' => 'Good',
            'description' => 'Newly created testing lab',
        ];

        $response = $this->postJson('/api/facilities', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'New Testing Hub',
                ],
            ]);
    }

    public function test_validation_fails_on_missing_fields(): void
    {
        $response = $this->postJson('/api/facilities', []);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation error',
            ]);
    }

    public function test_protected_route_middleware(): void
    {
        // Unauthenticated request should fail
        $response = $this->getJson('/api/protected/user-info');
        $response->assertStatus(401);

        // Authenticated with key should pass
        $responseWithKey = $this->withHeaders(['X-API-Key' => 'secret-key-123'])
            ->getJson('/api/protected/user-info');
        $responseWithKey->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
