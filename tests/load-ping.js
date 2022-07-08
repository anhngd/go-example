import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  ext: {
    loadimpact: {
      projectID: 3590778,
      // Test runs with the same name groups test runs together
      name: "Test loading"
    }
  },
  stages: [
    { duration: '2s', target: 1000000 }, // below normal load
    { duration: '5s', target: 1000000 },
    { duration: '2s', target: 1000000 }, // normal load
    { duration: '5s', target: 1000000 },
    { duration: '2s', target: 1000000 }, // around the breaking point
    { duration: '5s', target: 1000000 },
    { duration: '2s', target: 1000000 }, // beyond the breaking point
    { duration: '5s', target: 1000000 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
}

export default function () {
  http.get('http://localhost:8080/ping');
  sleep(1);
}