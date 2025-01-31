-- Create an enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create a table to store user roles
CREATE TABLE user_roles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a function to create a user role record when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a policy to allow users to read their own role
CREATE POLICY "Users can read their own role"
  ON user_roles
  FOR SELECT
  USING (auth.uid() = id);

-- Create a policy to allow admins to read all roles
CREATE POLICY "Admins can read all roles"
  ON user_roles
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM user_roles WHERE role = 'admin'
    )
  );

-- Create a policy to allow admins to update roles
CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM user_roles WHERE role = 'admin'
    )
  );
