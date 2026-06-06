CREATE TABLE users(
  user_id SERIAL PRIMARY KEY, 
  full_name VARCHAR(100) NOT NULL, 
  user_name VARCHAR(30) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL, 
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects(
  subject_id SERIAL PRIMARY KEY,
  subject TEXT UNIQUE NOT NULL
);

CREATE TABLE conversations(
  conversation_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  subject_id INTEGER REFERENCES subjects(subject_id),
  title TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages(
  message_id SERIAL PRIMARY KEY, 
  conversation_id INTEGER REFERENCES conversations(conversation_id) ON DELETE CASCADE, 
  sender VARCHAR(10) CHECK (sender IN ('user','ai')),
  content TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO subjects (subject) VALUES
('Mathematics'),
('Physics'),
('Chemistry'),
('ECM'),
('Digital Logic'),
('OOP');