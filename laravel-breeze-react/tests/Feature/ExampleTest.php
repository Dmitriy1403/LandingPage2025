<?php

it('returns a successful response', function () {
    $response = $this->get(route('home'));
    $response->assertOk();
});
