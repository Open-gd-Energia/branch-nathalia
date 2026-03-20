export const protectedRoutesMap = {
	GERACAO: ["/usinas*"],
	DASHBOARD: ["/dashboard*"],
	CONSUMO: ["/consumidores*"],
	PESSOAS: ["/pessoas*"],
	ALOCACAO: ["/alocacao*"],
	COBRANCA: ["/cobrancas*"],
	FATURAS: ["/faturas*"],
	CONFIGURACAO: ["/config*"],

	DADOS: ["/perfil*"],
};

export function pathMatchesPattern(
	pathname: string,
	pattern: string | RegExp,
): boolean {
	let re: RegExp;

	if (pattern instanceof RegExp) {
		// if you've passed in a real RegExp, just use it
		re = pattern;
	} else {
		// escape regex metacharacters, then turn * → .*
		const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
		const regexString = `^${escaped.replace(/\*/g, ".*")}$`;
		re = new RegExp(regexString);
	}

	return re.test(pathname);
}
