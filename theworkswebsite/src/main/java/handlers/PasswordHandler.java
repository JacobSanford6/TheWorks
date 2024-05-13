package handlers;

import com.password4j.Argon2Function;
import com.password4j.Hash;
import com.password4j.SaltGenerator;
import com.password4j.types.Argon2;

public final class PasswordHandler {
	private static int iterations = 123;
	private static int memory = 1024;
	private static Argon2 type = Argon2.D;
	private static Argon2Function argon = Argon2Function.getInstance(memory, iterations, 1, 32, type, 0x13);

	public static String[] getHashAndSaltFromPlaintextPassword(String plaintextPassword) {
		String salt = SaltGenerator.generate(128).toString();
		Hash hash = argon.hash(plaintextPassword, salt);
		String[] returnVals = { hash.getResult(), hash.getSalt() };
		return returnVals;
	}

	public static boolean checkHash(String plainTextPassword, String hash, String salt) {
		return argon.check(plainTextPassword, hash, salt);
	}
}
