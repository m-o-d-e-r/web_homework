import os
import re
from collections import OrderedDict

from dotenv import dotenv_values, find_dotenv

from api.utils.singleton import Singleton


class EnvConfigReader(metaclass=Singleton):
    def __init__(self, base_word: str = "API_") -> None:
        self.__pattern = re.compile(fr"{base_word}\w+")
        self.__config: dict[str, str] | OrderedDict[str, str] = {}

        self._read()

    def _read(self) -> None:
        """
        Read config from dotenv file or environment variables and store in __config.
        """
        __env_path = find_dotenv()
        if __env_path:
            self.__config = dotenv_values(__env_path)

        for key, value in os.environ.items():
            if re.match(self.__pattern, key):
                self.__config[key] = value

    def __getattr__(self, __name: str) -> int | str | None:
        """
        Get value of environment variable. This method is used to get value of environment variable.

        Args:
            __name: Name of variable to get

        Returns:
            Value of environment variable or None if not defined in config.
        """

        return self.__config.get(__name)

    @property
    def config(self) -> dict[str, str] | OrderedDict[str, str]:
        """
        Return the configuration of the Burrito's components.
        """
        return self.__config


def get_config() -> EnvConfigReader:
    """
    Get configuration object for Burrito.
    """
    return EnvConfigReader()
