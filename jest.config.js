module.exports = {
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	testEnvironment: 'jest-environment-node',
	testRegex: '.test.js$',
	coverageDirectory: './coverage',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.js'],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90
		}
	},
	errorOnDeprecated: true,
	verbose: true
};
