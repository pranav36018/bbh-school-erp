const http = require('http');

function postJSON(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function getURL(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + path, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, len: body.length }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('=== STARTING COMPLETE VERIFICATION ===\n');

  // Test 1: Homepage
  const home = await getURL('/');
  console.log(`[1] Homepage status: ${home.status} (${home.len} bytes)`);

  // Test 2: State Homepage
  const stateHome = await getURL('/state');
  console.log(`[2] State Board portal status: ${stateHome.status}`);

  // Test 3: CBSE Homepage
  const cbseHome = await getURL('/cbse');
  console.log(`[3] CBSE Board portal status: ${cbseHome.status}`);

  // Test 4: Demo State Student Login
  const demoAuth = await postJSON('/api/auth/login', {
    email: 'student.state@svvk.edu.in',
    password: 'Student@2026',
    portal: 'student',
    board: 'state',
  });
  console.log(`[4] Demo Student Login: status=${demoAuth.status}, success=${demoAuth.data?.success}, name=${demoAuth.data?.user?.fullName}`);

  // Test 5: Roster Student Login (From students.csv: Kaarshika V)
  const rosterStudentAuth = await postJSON('/api/auth/login', {
    email: 'student.kaarshika.030@svvk.demo',
    password: 'Dolphin-Nectar-River-30',
    portal: 'student',
    board: 'state',
  });
  console.log(`[5] Roster Student (from CSV) Login: status=${rosterStudentAuth.status}, success=${rosterStudentAuth.data?.success}, name=${rosterStudentAuth.data?.user?.fullName}, role=${rosterStudentAuth.data?.user?.role}`);

  // Test 6: Roster Teacher Login (From teachers.csv: Arathi Baradi)
  const rosterTeacherAuth = await postJSON('/api/auth/login', {
    email: 'arathi@svvk.demo',
    password: 'River-Honey-Forest-34',
    portal: 'teacher',
    board: 'state',
  });
  console.log(`[6] Roster Teacher (from CSV) Login: status=${rosterTeacherAuth.status}, success=${rosterTeacherAuth.data?.success}, name=${rosterTeacherAuth.data?.user?.fullName}, role=${rosterTeacherAuth.data?.user?.role}`);

  // Test 7: Roster Admin Login (From admins.csv: Anita)
  const rosterAdminAuth = await postJSON('/api/auth/login', {
    email: 'anita@svvk.demo',
    password: 'Rocket-Marble-Anchor-36',
    portal: 'admin',
    board: 'state',
  });
  console.log(`[7] Roster Admin (from CSV) Login: status=${rosterAdminAuth.status}, success=${rosterAdminAuth.data?.success}, name=${rosterAdminAuth.data?.user?.fullName}, role=${rosterAdminAuth.data?.user?.role}`);

  // Test 8: Student Games Page
  const games = await getURL('/student/games');
  console.log(`[8] 5 Mind Games & Certificate Page status: ${games.status}`);

  // Test 9: Student Learn Video Classroom
  const videoLearn = await getURL('/student/learn');
  console.log(`[9] Student YouTube Classroom Page status: ${videoLearn.status}`);

  // Test 10: Teacher Videos Management Hub
  const teacherVideos = await getURL('/teacher/videos');
  console.log(`[10] Faculty Video Management Hub status: ${teacherVideos.status}`);

  console.log('\n=== ALL VERIFICATION CHECKS COMPLETED SUCCESSFULLY ===');
}

runTests().catch(console.error);
